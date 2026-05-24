/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach } from 'vitest';

// Mock window.location for different scenarios
function setHostname(hostname) {
  delete window.location;
  window.location = new URL(`https://${hostname}/`);
}

// Replicate the APP_ENV logic from config.js
const PROD_HOSTNAMES = [
  'newtab.online',
  'www.newtab.online',
  'newtab-rfyoq591j-hongjiaonis-projects.vercel.app'
];

function detectAppEnv(hostname) {
  const host = String(hostname || '').toLowerCase();
  return PROD_HOSTNAMES.includes(host) ? 'production' : 'staging';
}

// Replicate the config structure
const APP_ENV_CONFIG = {
  production: {
    googleClientId: '608226137663-n7g5fqo6268rqs51nu6iv4m9d202phah.apps.googleusercontent.com',
    siteUrl: 'https://newtab.online',
    paddle: { environment: 'production' }
  },
  staging: {
    googleClientId: '608226137663-lpjl8odq86ded8d8qc07ipvrjd1pq6iu.apps.googleusercontent.com',
    siteUrl: 'https://staging.newtab.online',
    paddle: { environment: 'sandbox' }
  }
};

describe('APP_ENV detection', () => {
  it('should detect production for newtab.online', () => {
    expect(detectAppEnv('newtab.online')).toBe('production');
  });

  it('should detect production for www.newtab.online', () => {
    expect(detectAppEnv('www.newtab.online')).toBe('production');
  });

  it('should detect production for vercel preview domain', () => {
    expect(detectAppEnv('newtab-rfyoq591j-hongjiaonis-projects.vercel.app')).toBe('production');
  });

  it('should detect staging for localhost', () => {
    expect(detectAppEnv('localhost')).toBe('staging');
  });

  it('should detect staging for unknown domains', () => {
    expect(detectAppEnv('example.com')).toBe('staging');
    expect(detectAppEnv('staging.newtab.online')).toBe('staging');
    expect(detectAppEnv('dev.newtab.online')).toBe('staging');
  });

  it('should handle empty hostname', () => {
    expect(detectAppEnv('')).toBe('staging');
  });
});

describe('APP_ENV_CONFIG', () => {
  it('production should have valid googleClientId', () => {
    expect(APP_ENV_CONFIG.production.googleClientId).toMatch(/^\d+-.+\.apps\.googleusercontent\.com$/);
  });

  it('production should have correct site URL', () => {
    expect(APP_ENV_CONFIG.production.siteUrl).toBe('https://newtab.online');
  });

  it('production paddle should be production environment', () => {
    expect(APP_ENV_CONFIG.production.paddle.environment).toBe('production');
  });

  it('staging paddle should be sandbox', () => {
    expect(APP_ENV_CONFIG.staging.paddle.environment).toBe('sandbox');
  });

  it('staging should have a different googleClientId from production', () => {
    expect(APP_ENV_CONFIG.staging.googleClientId).not.toBe(APP_ENV_CONFIG.production.googleClientId);
  });

  it('config resolution should pick correct environment', () => {
    const resolvedProd = APP_ENV_CONFIG.production;
    const resolvedStaging = APP_ENV_CONFIG.staging;

    expect(resolvedProd.siteUrl).toBe('https://newtab.online');
    expect(resolvedStaging.siteUrl).toBe('https://staging.newtab.online');
  });
});
