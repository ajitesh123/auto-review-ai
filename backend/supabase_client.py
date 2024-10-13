from supabase import create_client, Client
import yaml
from typing import Dict, Any

# Load configuration
with open('backend/config.yaml', 'r') as file:
    config = yaml.safe_load(file)

supabase_url = config['supabase']['url']
supabase_key = config['supabase']['key']

supabase: Client = create_client(supabase_url, supabase_key)

# User operations
def create_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
    return supabase.table('users').insert(user_data).execute()

def get_user(user_id: str) -> Dict[str, Any]:
    return supabase.table('users').select('*').eq('id', user_id).single().execute()

def update_user(user_id: str, user_data: Dict[str, Any]) -> Dict[str, Any]:
    return supabase.table('users').update(user_data).eq('id', user_id).execute()

# Review operations
def create_review(review_data: Dict[str, Any]) -> Dict[str, Any]:
    return supabase.table('reviews').insert(review_data).execute()

def get_user_reviews(user_id: str) -> Dict[str, Any]:
    return supabase.table('reviews').select('*').eq('user_id', user_id).execute()