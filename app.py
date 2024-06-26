import streamlit as st
from review import ReviewRequest, generate_review, DEFAULT_QUESTIONS
from self_review import SelfReviewRequest, generate_self_review

# Streamlit UI
st.set_page_config(page_title="Performance Review Assistant", layout="wide")

# Sidebar for common elements
with st.sidebar:
    st.title("Review Settings")
    review_type = st.radio("Select Review Type", ["Performance Review", "Self-Review"])
    llm_type = st.selectbox('Select LLM Type', ['openai', 'google', 'anthropic', 'groq'])
    model_size = st.selectbox('Select Model Size', ['small', 'medium', 'large'])
    user_api_key = st.text_input('Your API Key', type="password")

if review_type == "Performance Review":
    st.title("Write Performance Review in a Minute")

    st.text("""If no question is passed, the following are considered:
            1. Describe example(s) of the topics selected. What was the context? What actions did they take?
            2. In your opinion, what impact did their actions have?
            3. What recommendations do you have for their growth and development? Your feedback can be about any area of their work.
            """)

    your_role = st.text_input('Your Role')
    candidate_role = st.text_input('Candidate Role')
    perf_question = st.text_area('Performance Review Questions (one per line)', height=100)
    your_review = st.text_area('Briefly describe your experience of working with the candidate including project, responsibility of candidate, unique things they did etc., in free flow writing', height=200)

    if st.button('Generate Performance Review'):
        if not user_api_key:
            st.error("Please enter your API key in the sidebar.")
        elif not your_role or not candidate_role or not your_review:
            st.error("Please fill in all required fields.")
        else:
            try:
                questions = perf_question.split('\n') if perf_question else DEFAULT_QUESTIONS.split('\n')
                review_request = ReviewRequest(
                    your_role=your_role,
                    candidate_role=candidate_role,
                    perf_question="\n".join(questions),
                    your_review=your_review,
                    llm_type=llm_type,
                    user_api_key=user_api_key,
                    model_size=model_size
                )
                
                review = generate_review(**review_request.model_dump())
                
                for qa in review:
                    st.markdown(f"**{qa['question']}**")
                    st.markdown(qa['answer'])
                    st.markdown("---")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")

else:  # Self-Review
    st.title("Generate Your Self-Review")

    st.text("""Provide a text dump of your performance information, specific questions you want to address,
            and any additional instructions for the AI to consider while generating your self-review.""")

    text_dump = st.text_area('Text Dump (information about your performance)', height=200)
    questions = st.text_area('Questions to Answer in Self-Review (one per line)', height=100)
    instructions = st.text_area('Additional Instructions (optional)', height=100)

    if st.button('Generate Self-Review'):
        if not user_api_key:
            st.error("Please enter your API key in the sidebar.")
        elif not text_dump or not questions:
            st.error("Please provide both the text dump and questions.")
        else:
            try:
                question_list = [q.strip() for q in questions.split('\n') if q.strip()]
                self_review_request = SelfReviewRequest(
                    text_dump=text_dump,
                    questions=question_list,
                    instructions=instructions if instructions else None,
                    llm_type=llm_type,
                    user_api_key=user_api_key,
                    model_size=model_size
                )
                
                self_review = generate_self_review(**self_review_request.model_dump())
                
                for qa in self_review:
                    st.markdown(f"**{qa['question']}**")
                    st.markdown(qa['answer'])
                    st.markdown("---")
            except Exception as e:
                st.error(f"An error occurred: {str(e)}")