import { useState } from 'react';
import dynamic from 'next/dynamic';
import { generateSelfReview } from '@services/review';
import { isBlankObject } from '@utils/object';
import { TextButton } from '@components/ui/button';
import { useFlashMessage } from '@components/ui/flash-messages';

const AudioInputComponent = dynamic(() => import('./AudioInput'), {
  ssr: false,
});

interface SelfReviewProps {
  paramsWhenKeysNeeded: {
    userApiKey?: string;
    // Add other properties as needed
  };
  onReviewResultsReceived: (
    self_review: Array<{ question: string; answer: string }>
  ) => void;
}

const SelfReview = ({
  paramsWhenKeysNeeded,
  onReviewResultsReceived,
}: SelfReviewProps) => {
  const { addFailureMessage } = useFlashMessage();
  const [formState, setFormState] = useState({
    textDump: '',
    questions: '',
    instructions: '',
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
    if (!formState.questions) {
      throw new Error('Please provide both the text dump and questions.');
    }
    if (!formState.textDump && !transcription) {
      throw new Error('Please provide either a text dump or audio input.');
    }
  };

  const handleGenerateSelfReview = async () => {
    setIsLoading(true);

    try {
      validateForm();

      const requestData = {
        text_dump: formState.textDump + transcription,
        questions: formState.questions
          .split('\n')
          .map((q) => q.trim())
          .filter(Boolean),
        instructions: formState.instructions || null,
        is_paid: false,
        ...paramsWhenKeysNeeded,
      };

      const response = (await generateSelfReview(requestData)) as {
        self_review: Array<{ question: string; answer: string }>;
      };
      onReviewResultsReceived(response.self_review);
    } catch (error: any) {
      console.error('Error generating self-review:', error);

      const errMsg =
        error?.message || 'An error occurred while generating the self review.';
      addFailureMessage({ message: errMsg, autoClose: false });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative isolate px-6 py-4 lg:py-8 lg:px-8 widget-animate animate in-view">
      <div className="flex flex-col shadow-2xl mx-auto max-w-5xl justify-between gap-8 border-secondary items-center rounded-xl border bg-zinc-800 p-6 sm:p-12 sm:px-12  dark:bg-zinc-900">
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Text Dump (information about your performance)
          </label>
          <textarea
            value={formState.textDump}
            onChange={updateFormField('textDump')}
            placeholder="Please enter your inputs..."
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
            rows={4}
          />
        </div>
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Questions to Answer in Self-Review (one per line)
          </label>
          <textarea
            value={formState.questions}
            onChange={updateFormField('questions')}
            placeholder="Please enter questions..."
            className="w-full px-3 py-2 border rounded
              bg-background border-gray-700 text-gray-300
              placeholder:text-gray-600 hover:bg-neutral-800"
            rows={4}
          />
        </div>
        <div className="w-full">
          <label className="block text-milk text-sm font-medium mb-2">
            Additional Instructions (optional)
          </label>
          <textarea
            value={formState.instructions}
            onChange={updateFormField('instructions')}
            placeholder="Please enter additional instructions..."
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
          onClick={handleGenerateSelfReview}
          variant={`primary-self-review`}
          disabled={isLoading}
          className="font-semibold"
        >
          {isLoading ? 'Generating...' : 'Generate Self Review'}
        </TextButton>
      </div>
    </section>
  );
};

export default SelfReview;
