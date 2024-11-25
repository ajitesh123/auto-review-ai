export interface User {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  picture: string;
}

export interface UserDetails {
  id: string,
  email: string,
  name: string,
  is_paid: boolean,
  subscription_tier: string,
  subscription_start_date: string,
  subscription_end_date: string,
  stripe_customer_id: string,
  stripe_subscription_id: string,
  remaining_credits: number,
  total_credits_purchased: number,
  api_calls_count: number,
  last_api_call: string,
  created_at: string,
  updated_at: string
}
