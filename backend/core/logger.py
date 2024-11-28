from functools import wraps
from logtail import LogtailHandler
from backend.core.config import Config
from loguru import logger

handler = LogtailHandler(source_token=Config.BetterStack.API_KEY)

logger.add(handler, level="INFO")

def print_arguments(func):
    def wrapper(*args, **kwargs):
        print(f"Function: {func.__name__}")
        print("Arguments:")

        # Print positional arguments
        for i, arg in enumerate(args, start=1):
            print(f"  Arg {i}: {arg}")

        # Print keyword arguments
        for key, value in kwargs.items():
            print(f"  {key}: {value}")

        # Call the original function
        result = func(*args, **kwargs)

        return result

    return wrapper



