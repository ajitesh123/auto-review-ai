# Third-party imports
from fastapi import HTTPException, Depends, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from backend.kindle_auth import kinde_client, kinde_configuration
from backend.config import Config


# OAuth2 scheme for FastAPI
oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f"{Config.Kinde.DOMAIN}/oauth2/auth",
    tokenUrl=f"{Config.Kinde.DOMAIN}/oauth2/token",
)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    """Dependency to check if user is authenticated."""
    if not kinde_client.is_authenticated():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return kinde_client.get_user_details()