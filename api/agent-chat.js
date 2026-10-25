// ===== NewTab Agent Chat Proxy (Vercel Serverless) =====
// OpenAI-compatible chat proxy (the same protocol used by LobeChat /
// NextChat / Open WebUI) with SSE streaming + vision support.
// Configure the matching API key as an environment variable in Vercel:
//   DEEPSEEK_API_KEY   -> DeepSeek
//   ARK_API_KEY        -> Doubao (Volcengine Ark)
//   DASHSCOPE_API_KEY  -> Qwen (Alibaba DashScope)
//   MINIMAX_API_KEY    -> MiniMax
//   OPENAI_API_KEY     -> OpenAI
const PROVIDERS = {
  deepseek: {
    base: 'https://api.deepseek.com/chat/completions',
    env: 'DEEPSEEK_API_KEY',
    model: 'deepseek-chat',
    headers: (key) => ({ Authorization: 'Bearer ' + key })
  },
  doubao: {
    base: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    env: 'ARK_API_KEY',
    model: 'doubao-pro-32k',
    headers: (key) => ({ Authorization: 'Bearer ' + key })
  },
  qwen: {
    base: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    env: 'DASHSCOPE_API_KEY',
    model: 'qwen-plus',
    headers: (key) => ({ Authorization: 'Bearer ' + key })
  },
  minimax: {
    base: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    env: 'MINIMAX_API_KEY',
    model: 'MiniMax-Text-01',
    headers: (key) => ({ Authorization: 'Bearer ' + key })
  },
  openai: {
    base: 'https://api.openai.com/v1/chat/completions',
    env: 'OPENAI_API_KEY',
    model: 'gpt-4o-mini',
    headers: (key) => ({ Authorization: 'Bearer ' + key })
  }
};

const FALLBACK_MODEL = (provider) => (PROVIDERS[provider] || {}).model || '';

function sse(res, data) {
  res.write('data: ' + JSON.stringify(data) + '\n\n');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { provider, model, messages, stream } = req.body || {};
  const cfg = PROVIDERS[provider];
  if (!cfg) {
    return res.status(400).json({ error: 'Unknown provider: ' + provider });
  }
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages is required' });
  }

  const apiKey = process.env[cfg.env];
  if (!apiKey) {
    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      sse(res, { error: 'Agent API key is not configured for ' + provider + '. Add ' + cfg.env + ' in the Vercel project settings.' });
      return res.end();
    }
    return res.status(200).json({
      error: 'Agent API key is not configured for ' + provider + '. Add ' + cfg.env + ' in the Vercel project settings.'
    });
  }

  const wantStream = stream === true;
  const payload = {
    model: model || cfg.model,
    messages: messages
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant'))
      .map((m) => ({ role: m.role, content: m.content }))
      .slice(-40)
  };
  if (wantStream) payload.stream = true;

  try {
    const upstream = await fetch(cfg.base, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...cfg.headers(apiKey)
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(90000)
    });

    // Streaming path: relay SSE chunks from the provider
    if (wantStream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders && res.flushHeaders();

      if (!upstream.ok || !upstream.body) {
        const data = await upstream.json().catch(() => ({}));
        sse(res, { error: (data && (data.error?.message || data.message)) || ('Upstream HTTP ' + upstream.status) });
        return res.end();
      }

      const reader = upstream.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop();
          for (const line of lines) {
            const t = line.trim();
            if (!t.startsWith('data:')) continue;
            const dataStr = t.slice(5).trim();
            if (dataStr === '[DONE]') continue;
            try {
              const chunk = JSON.parse(dataStr);
              const delta = chunk?.choices?.[0]?.delta?.content;
              if (typeof delta === 'string' && delta) sse(res, { delta });
            } catch (_err) { /* partial */ }
          }
        }
      } catch (err) {
        sse(res, { error: 'Stream interrupted: ' + String(err?.message || err) });
        return res.end();
      }
      res.end();
      return;
    }

    // Non-streaming path
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      return res.status(200).json({ error: (data && (data.error?.message || data.message)) || 'Upstream provider error' });
    }
    const content = data?.choices?.[0]?.message?.content;
    if (typeof content !== 'string') {
      return res.status(200).json({ error: 'Unexpected provider response' });
    }
    return res.status(200).json({ content });
  } catch (err) {
    if (wantStream) {
      res.setHeader('Content-Type', 'text/event-stream');
      sse(res, { error: 'Agent request failed: ' + String(err?.message || err) });
      return res.end();
    }
    return res.status(200).json({ error: 'Agent request failed: ' + String(err?.message || err) });
  }
};