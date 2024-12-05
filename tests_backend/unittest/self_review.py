from backend.self_review import generate_self_review, SelfReviewRequest
from backend.core.config import Config
from backend.core.logger import logger


def test_generate_self_review():
    # Method 1: Using generate_self_review function directly
    logger.info("1st: Testing generate_self_review function directly")

    review = generate_self_review(
        text_dump="During this quarter, I led the API redesign project and delivered it ahead of schedule. I coordinated with multiple teams and improved system performance by 40%. I also mentored two junior developers.",
        questions="""
        - What were your key achievements this quarter?
        - How did you demonstrate leadership?
        """,
        instructions="Focus on quantifiable achievements",
        llm_type="anthropic",
        user_api_key=Config.APIKeys.ANTHROPIC,
        model_size="small"
    )

    logger.info(f"review using generate_self_review: {review}")

    # Method 2: Using the SelfReviewRequest model
    logger.info("2nd: Testing SelfReviewRequest model. This skips questions, which is optional.")

    request = SelfReviewRequest(
        text_dump="During this quarter, I led the API redesign project...",
        instructions="Focus on quantifiable achievements",
        llm_type="anthropic",
        user_api_key=Config.APIKeys.ANTHROPIC,
        model_size="small"
    )

    # If you want to use SelfReviewRequest, you need to unpack its attributes
    review2 = generate_self_review(
        text_dump=request.text_dump,
        instructions=request.instructions,
        llm_type=request.llm_type,
        user_api_key=request.user_api_key,
        model_size=request.model_size
    )
    logger.info(f"review using SelfReviewRequest: {review2}")


if __name__ == "__main__":
    test_generate_self_review()
