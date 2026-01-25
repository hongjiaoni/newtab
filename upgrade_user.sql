-- Update user hongjiaoni@gmail.com to Premium membership (Tier 2)

UPDATE public.profiles
SET 
  membership_tier = 2,
  subscription_status = 'active',
  subscription_end_date = NOW() + INTERVAL '1 year',
  updated_at = NOW()
WHERE email = 'hongjiaoni@gmail.com';

-- Verify the update
SELECT 
  email, 
  membership_tier, 
  subscription_status, 
  subscription_end_date
FROM public.profiles
WHERE email = 'hongjiaoni@gmail.com';
