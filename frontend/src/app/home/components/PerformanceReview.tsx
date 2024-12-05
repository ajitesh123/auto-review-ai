import { useState } from 'react';
import dynamic from 'next/dynamic';
import { generateReview } from '@services/review';
import { isBlankObject } from '@utils/object';
import { TextButton } from '@components/ui/button';
import { useFlashMessage } from '@components/ui/flash-messages';
import { useAppContext } from '@contexts/AppContext';
import { SvgIcon } from '@components/ui/svg-icon';
import AiIcon from '@assets/icons/ai.svg';

const AudioInputComponent = dynamic(() => import('./AudioInput'), {
  ssr: false,
});

const reviewQuestionsHint = `- What actions did they take?
- What impacts did their actions have?
- What recommendations do you have for their growth?`;

interface PerformanceReviewProps {
  paramsWhenKeysNeeded: {
    userApiKey?: string;
    // Add other properties as needed
  };
  onReviewResultsReceived: (
    review: Array<{ question: string; answer: string }>
  ) => void;
  setIsReviewGenerating: (value: Boolean) => void;
}

interface FormState {
  yourRole: string;
  candidateRole: string;
  perfQuestion: string;
  yourReview: string;
}

const PerformanceReview = ({
  paramsWhenKeysNeeded,
  onReviewResultsReceived,
  setIsReviewGenerating,
}: PerformanceReviewProps) => {
  const { addInfoMessage, addFailureMessage } = useFlashMessage();
  const { accessToken } = useAppContext();

  const [formState, setFormState] = useState<FormState>({
    yourRole: '',
    candidateRole: '',
    perfQuestion: '',
    yourReview: '',
  });
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // Use this to update form fields:
  const updateFormField =
    (field: keyof typeof formState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validateForm = () => {
    if (
      !isBlankObject(paramsWhenKeysNeeded) &&
      !paramsWhenKeysNeeded?.userApiKey
    ) {
      throw new Error('Please enter your API key.');
    }
    if (!formState.yourRole || !formState.candidateRole) {
      throw new Error('Please fill in all required fields.');
    }
    if (!formState.yourReview && !transcription) {
      throw new Error('Please provide either a review dump or audio input.');
    }
  };

  const handleGenerateReview = async () => {
    if (!accessToken) {
      addInfoMessage({ message: 'Please login to generate review' });
      return;
    }

    setIsLoading(true);
    setIsReviewGenerating(true);

    try {
      validateForm();

      const requestData = {
        your_role: formState.yourRole,
        candidate_role: formState.candidateRole,
        perf_question: formState.perfQuestion,
        your_review: `${formState.yourReview} ${transcription}`.trim(),
        is_paid: false,
        ...paramsWhenKeysNeeded,
      };

      const response = (await generateReview(requestData)) as {
        review: Array<{ question: string; answer: string }>;
      };
      onReviewResultsReceived(response.review);
    } catch (error: any) {
      console.error('Error generating review:', error);
      const errMsg =
        error?.message || 'An error occurred while generating the review.';
      addFailureMessage({ message: errMsg, autoClose: false });
    } finally {
      setIsLoading(false);
      setIsReviewGenerating(false);
    }
  };

  return (
    <div className="relative isolate bg-zinc-800 w-full h-full widget-animate animate in-view">
      <div className="flex flex-col mx-auto w-full justify-between gap-8 items-center p-6 sm:p-12 sm:px-12">
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Your Role
          </label>
          <input
            type="text"
            value={formState.yourRole}
            onChange={updateFormField('yourRole')}
            placeholder="Please enter your role"
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
          />
        </div>
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Candidate Role
          </label>
          <input
            type="text"
            value={formState.candidateRole}
            onChange={updateFormField('candidateRole')}
            placeholder="Please enter candidate role"
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
          />
        </div>
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Performance Review Questions (one per line)
          </label>
          <textarea
            value={formState.perfQuestion}
            onChange={updateFormField('perfQuestion')}
            placeholder={reviewQuestionsHint}
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
            rows={4}
          />
        </div>
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Your Review
          </label>
          <textarea
            value={formState.yourReview}
            onChange={updateFormField('yourReview')}
            placeholder="Please enter your review..."
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
            rows={4}
          />
        </div>
        <div className="w-full">
          <AudioInputComponent
            paramsWhenKeysNeeded={paramsWhenKeysNeeded}
            onTranscriptionReceived={setTranscription}
          />
        </div>
        <TextButton
          onClick={handleGenerateReview}
          variant={`primary-perf-review`}
          disabled={isLoading}
          className="font-semibold"
          startIcon={<SvgIcon svg={AiIcon} size="lg" />}
        >
          {isLoading ? 'Generating...' : 'Generate Performance Review'}
        </TextButton>
      </div>
    </div>
  );
};

export default PerformanceReview;
