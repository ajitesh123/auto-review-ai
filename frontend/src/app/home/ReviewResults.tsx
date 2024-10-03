import { Key } from 'react';

interface ReviewItem {
  question: string;
  answer: string;
}

const ReviewResults = ({ review }: any) => {
  return (
    <>
      {review.length > 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold mb-4">Generated Review</h2>
          {review.map((item: ReviewItem, index: Key) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ReviewResults;
