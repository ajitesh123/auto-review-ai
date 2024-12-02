import PerformanceReview from "./components/PerformanceReview";
import SelfReview from "./components/SelfReview";
import { ReviewType } from "@constants/common";
import ReviewResults from "./components/ReviewResults";

// TODO: to be removed
const abc = [
  {
    "question": "Describe example(s) of the topics selected. What was the context? What actions did they take?",
    "answer": "As a good leader, the VP consistently demonstrated effective leadership skills in various contexts. For example, during our recent project launch, they took charge by clearly communicating goals, delegating tasks appropriately, and providing support to team members. They also showed initiative in organizing regular team meetings to ensure everyone was aligned and had a platform to voice concerns or ideas."
  },
  {
    "question": "In your opinion, what impact did their actions have?",
    "answer": "Their actions had a significant positive impact on the team and our overall performance. By providing clear direction and support, they boosted team morale and productivity. The regular meetings they organized improved communication and collaboration within the team, leading to more efficient problem-solving and faster project completion. Their leadership style fostered a positive work environment where team members felt valued and motivated to contribute their best efforts."
  },
  {
    "question": "What recommendations do you have for their growth and development? Your feedback can be about any area of their work.",
    "answer": "To further enhance their leadership skills, I recommend the VP focus on developing their mentoring abilities. While they are already a good leader, providing more one-on-one guidance to team members could help nurture individual talents and drive personal growth within the team. Additionally, they could benefit from expanding their strategic thinking skills to better anticipate long-term challenges and opportunities for the department. Lastly, exploring innovative leadership techniques through workshops or executive education programs could introduce fresh perspectives to their already strong leadership approach."
  }
];

const Review = ({
  reviewType,
  paramsWhenKeysNeeded,
  reviewResults,
  onReviewResultsReceived,
}: any) => {

  return (
    <section className="relative isolate widget-animate animate in-view  mt-12 px-6 lg:px-8">
      <div className="mx-auto border-2 rounded-lg bg-zinc-900 border-slate-800 w-full lg:max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full items-stretch justify-center">
          <div className="flex flex-1 items-start">
            {/* Performance Review and Self Review */}
            {reviewType === ReviewType.perfReview ? (
              <PerformanceReview
                paramsWhenKeysNeeded={paramsWhenKeysNeeded}
                onReviewResultsReceived={onReviewResultsReceived}
              />
            ) : (
              <SelfReview
                paramsWhenKeysNeeded={paramsWhenKeysNeeded}
                onReviewResultsReceived={onReviewResultsReceived}
              />
            )}
          </div>
          <div className="flex flex-1">
            <ReviewResults reviews={reviewResults} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Review