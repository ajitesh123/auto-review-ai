import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables from @.env file
dotenv_path = find_dotenv()
load_dotenv(dotenv_path)

class Config:
    # Production
    NEXT_PUBLIC_API_BASE_URL = os.getenv("NEXT_PUBLIC_API_BASE_URL")

    # Development
    NEXT_PUBLIC_API_BASE_URL_DEV = os.getenv("NEXT_PUBLIC_API_BASE_URL_DEV")

    # Frontend base url
    FRONTEND_BASE_URL=os.getenv("FRONTEND_BASE_URL")

    # API Keys
    class APIKeys:
        OPENAI = os.getenv("OPENAI_API_KEY")
        ANTHROPIC = os.getenv("ANTHROPIC_API_KEY")
        GROQ = os.getenv("GROQ_API_KEY")
        GOOGLE = os.getenv("GOOGLE_API_KEY")

    # Logfire
    class Logfire:
        TOKEN = os.getenv("LOGFIRE_TOKEN")
        PROJECT_NAME = os.getenv("LOGFIRE_PROJECT_NAME")

    # Kinde
    class Kinde:
        CLIENT_ID = os.getenv("KINDE_CLIENT_ID")
        CLIENT_SECRET = os.getenv("KINDE_CLIENT_SECRET")
        DOMAIN = os.getenv("KINDE_DOMAIN")
        GRANT_TYPE = os.getenv("KINDE_GRANT_TYPE")
        CALLBACK_URL = os.getenv("KINDE_CALLBACK_URL")
        LOGOUT_URL = os.getenv("KINDE_LOGOUT_URL")

    # Supabase
    class Supabase:
        URL = os.getenv("SUPABASE_URL")
        KEY = os.getenv("SUPABASE_KEY")

    class MongoDB:
        URL = os.getenv("MONGODB_URL")

    class Helicone:
        API_KEY = os.getenv("HELIECONE_API_KEY")

    #Stripe
    class Stripe:
        SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
        PUBLISHABLE_KEY = os.getenv("STRIPE_PUBLISHABLE_KEY")
        WEBHOOK_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")  

# Usage example:
if __name__ == "__main__":
    print(f"OpenAI API Key: {Config.APIKeys.OPENAI}")
    print(f"Logfire Project Name: {Config.Logfire.PROJECT_NAME}")
    print(f"Kinde Domain: {Config.Kinde.DOMAIN}")
    print(f"Supabase URL: {Config.Supabase.URL}")
    print(f"Helicone API Key: {Config.Helicone.API_KEY}")
    print(f"Stripe Secret Key: {Config.Stripe.SECRET_KEY}")

