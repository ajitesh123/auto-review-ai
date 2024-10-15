from kinde_sdk import Configuration
from kinde_sdk.kinde_api_client import GrantType, KindeApiClient
from backend.config import Config

kinde_configuration = Configuration(host=Config.Kinde.DOMAIN)

kinde_api_client_params = {
    "configuration": kinde_configuration,
    "domain": Config.Kinde.DOMAIN,
    "client_id": Config.Kinde.CLIENT_ID,
    "client_secret": Config.Kinde.CLIENT_SECRET,
    "grant_type": GrantType.AUTHORIZATION_CODE,
    "callback_url": Config.Kinde.CALLBACK_URL
}

kinde_client = KindeApiClient(**kinde_api_client_params)