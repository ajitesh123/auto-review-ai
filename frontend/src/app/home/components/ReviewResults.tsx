import { Spinner } from '@components/ui/spinner';
import { useCallback, useState } from 'react';
import CustomMarkdown from 'src/components/CustomMarkdown';
import Typewriter from 'src/components/Typewriter';

interface ReviewItem {
  question: string;
  answer: string;
}

function formatText(element: any) {
  let result = '';
  element.childNodes.forEach((node: any) => {
    if (node.nodeType === Node.TEXT_NODE) {
      result += node.textContent;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'H3') {
        result += '<b>' + node.innerText + '</b>' + '\n'; // Convert H2 to bold state
      } else if (node.tagName === 'P') {
        result += node.innerText + '\n\n'; // Add double BR
      } else {
        result += formatText(node); // Recursively format child elements
      }
    }
  });
  return result;
}

const ReviewResults = ({ reviews, isReviewGenerating }: any) => {
  const [copyBtnText, setCopyBtnText] = useState('Copy');
  const [activeStreamIndex, setActiveStreamIndex] = useState(0); // Track the active review stream

  const handleCopyClick = useCallback(async () => {
    setCopyBtnText('Copied!');
    // Get the parent div
    const parentDiv = document.getElementById('reviews') || new HTMLElement();
    // Get the formatted content
    const copiedContent = formatText(parentDiv);
    try {
      // copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([copiedContent], { type: 'text/html' }),
        }),
      ]);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }

    setTimeout(() => {
      setCopyBtnText('Copy');
    }, 1500);
  }, [setCopyBtnText]);

  const handleCompleteStream = () => {
    if (activeStreamIndex < reviews.length - 1) {
      setActiveStreamIndex((prev) => prev + 1); // Move to the next review
    }
  };

  return (
    <section className="relative isolate widget-animate animate w-full h-full">
      <div className="flex flex-col mx-auto w-full h-full justify-between gap-10">
        <div className="h-full w-full">
          <div className="grid w-full h-full gap-8  p-6 sm:p-12 sm:px-12 sm:text-base">
            {reviews.length === 0 ? (
              <div className="flex flex-col text-center items-center m-auto">
                <span className="font-semibold text-gray-800 tracking-tight text-4xl">
                  Please provide inputs to get the generated review here...
                </span>
                {isReviewGenerating && <Spinner size="xl" className="mt-8" />}
              </div>
            ) : (
              <div>
                <div className="flex flex-row justify-between mb-12">
                  <h2 className="font-semibold text-slate-300 tracking-tight text-4xl">
                    Generated Review
                  </h2>
                  <div className="flex justify-end overflow-y-auto">
                    <span className="inline-flex items-center text-sm">
                      <button
                        type="button"
                        onClick={handleCopyClick}
                        className="inline-flex space-x-2 text-slate-500 hover:text-slate-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="h-5 w-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                          ></path>
                        </svg>
                        <span className="font-medium">{copyBtnText}</span>
                      </button>
                    </span>
                  </div>
                </div>

                <div id="reviews" className="flex flex-col gap-8">
                  {reviews.map((item: ReviewItem, index: any) => (
                    <div
                      key={index}
                      className={`border-b pb-8 border-gray-600 ${
                        index <= activeStreamIndex ? 'block' : 'hidden'
                      }`}
                    >
                      <h3 className="text-milk font-semibold mb-2">
                        {item.question}
                      </h3>
                      {index < activeStreamIndex ? (
                        <CustomMarkdown
                          content={item.answer}
                          className="text-sm leading-6 font-medium"
                        />
                      ) : index === activeStreamIndex ? (
                        <p className="text-slate-300 leading-6 text-sm font-medium">
                          <Typewriter
                            text={item.answer}
                            speed={10}
                            onComplete={handleCompleteStream}
                          />
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewResults;
