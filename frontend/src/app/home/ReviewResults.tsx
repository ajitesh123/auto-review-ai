import { Key } from 'react';

interface ReviewItem {
  question: string;
  answer: string;
}

const ReviewResults = ({ reviews }: any) => {
  return (
    <section className="relative isolate px-6 py-4 lg:py-8 lg:px-8">
      <div className="flex flex-col mx-auto max-w-5xl justify-between gap-10">
        <div className="h-full w-full widget-animate animate">
          <div className="border-secondary grid max-w-full gap-8 rounded-xl border bg-zinc-800 p-6 sm:p-12 sm:px-12 sm:text-base dark:bg-zinc-900">
            {reviews.length > 0 && (
              <div>
                <h2 className="font-semibold text-milk tracking-tight text-4xl mb-12">
                  Generated Review
                </h2>
                {reviews.map((item: ReviewItem, index: Key) => (
                  <div
                    key={index}
                    className="mb-12  border-b pb-8 border-gray-600"
                  >
                    <h3 className="text-milk text-lg font-medium mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-300 leading-6 text-sm font-medium">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewResults;
