from backend.review import generate_review, ReviewRequest
from backend.core.config import Config
from backend.core.logger import logger


def test_generate_review():
    # Method 1: Using generate_review function directly
    logger.info("1st: Testing generate_review function directly")

    review = generate_review(
        your_role="Engineering Manager",
        candidate_role="Software Engineer",
        perf_question="""
        - What were their key achievements this quarter?
        - What areas need improvement?
        """,
        your_review="John has shown excellent initiative in leading the API redesign project. He successfully coordinated with multiple teams and delivered the project ahead of schedule. However, his documentation could be more detailed.",
        llm_type="anthropic",  # can be "openai", "google", "anthropic", or "groq"
        user_api_key=Config.APIKeys.ANTHROPIC,
        model_size="small"  # default is "small"
    )

    logger.info(f"review using generate_review: {review}")

    # Method 2: Using the ReviewRequest model
    logger.info("2nd: Testing ReviewRequest model")

    request = ReviewRequest(
        your_role="Engineering Manager",
        candidate_role="Software Engineer",
        perf_question="""
        - What were their key achievements this quarter?
        - What areas need improvement?
        """,
        your_review="John has shown excellent initiative...",
        llm_type="anthropic",
        user_api_key=Config.APIKeys.ANTHROPIC
    )

    # If you want to use ReviewRequest, you need to unpack its attributes
    review2 = generate_review(
        your_role=request.your_role,
        candidate_role=request.candidate_role,
        perf_question=request.perf_question,
        your_review=request.your_review,
        llm_type=request.llm_type,
        user_api_key=request.user_api_key,
        model_size=request.model_size
    )
    logger.info(f"review using ReviewRequest: {review2}")

if __name__ == "__main__":
    test_generate_review()