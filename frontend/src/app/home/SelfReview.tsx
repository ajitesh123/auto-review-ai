import { useState } from 'react';
import { generateSelfReview } from '@services/review';
import AudioInput from './AudioInput';

const SelfReview = ({
  llmType,
  modelSize,
  userApiKey,
  groqApiKey,
  onReviewResultsReceived,
}: any) => {
  const [textDump, setTextDump] = useState('');
  const [questions, setQuestions] = useState('');
  const [instructions, setInstructions] = useState('');
  const [transcription, setTranscription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateSelfReview = async () => {
    setIsLoading(true);
    if (!userApiKey) {
      setIsLoading(false);
      alert('Please enter your API key.');
      return;
    }
    if (!questions) {
      setIsLoading(false);
      alert('Please provide both the text dump and questions.');
      return;
    }

    if (!textDump && !transcription) {
      setIsLoading(false);
      alert('Please provide either a text dump or audio input.');
      return;
    }

    try {
      const requestData = {
        text_dump: textDump + transcription,
        questions: questions
          .split('\n')
          .map((q) => q.trim())
          .filter(Boolean),
        instructions: instructions || null,
        llm_type: llmType,
        user_api_key: userApiKey,
        model_size: modelSize,
      };

      const response = (await generateSelfReview(requestData)) as {
        self_review: Array<{ question: string; answer: string }>;
      };
      onReviewResultsReceived(response.self_review);
    } catch (error) {
      console.error('Error generating self-review:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative isolate px-6 py-4 lg:py-8 lg:px-8">
      <div className="flex flex-col mx-auto max-w-5xl justify-between gap-10">
        <div className="h-full w-full widget-animate animate">
          <div className="border-secondary grid max-w-full gap-8 rounded-xl border bg-zinc-800 p-6 sm:p-12 sm:px-12 sm:text-base dark:bg-zinc-900">
            <div>
              <div className="mb-4">
                <label className="block text-milk text-sm font-medium mb-2">
                  Text Dump (information about your performance)
                </label>
                <textarea
                  value={textDump}
                  onChange={(e) => setTextDump(e.target.value)}
                  placeholder="Please enter your inputs..."
                  className="w-full px-3 py-2 border rounded
                    bg-background border-gray-700 text-gray-300
                    placeholder:text-gray-600 hover:bg-neutral-800"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-milk text-sm font-medium mb-2">
                  Questions to Answer in Self-Review (one per line)
                </label>
                <textarea
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  placeholder="Please enter questions..."
                  className="w-full px-3 py-2 border rounded
                    bg-background border-gray-700 text-gray-300
                    placeholder:text-gray-600 hover:bg-neutral-800"
                  rows={4}
                />
              </div>
              <div className="mb-4">
                <label className="block text-milk text-sm font-medium mb-2">
                  Additional Instructions (optional)
                </label>
                <textarea
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Please enter additional instructions..."
                  className="w-full px-3 py-2 border rounded
                    bg-background border-gray-700 text-gray-300
                    placeholder:text-gray-600 hover:bg-neutral-800"
                  rows={4}
                />
              </div>
              <AudioInput
                groqApiKey={groqApiKey}
                onTranscriptionReceived={setTranscription}
              />
              <button
                onClick={handleGenerateSelfReview}
                disabled={isLoading}
                className="w-full bg-violet-500 text-white py-2 rounded hover:bg-violet-600"
              >
                 {isLoading ? 'Generating...' : 'Generate Self-Review'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfReview;
