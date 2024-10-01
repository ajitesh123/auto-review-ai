import React from 'react';

const Sidebar = ({
  onReviewTypeChange,
  onLlmTypeChange,
  onModelSizeChange,
  onUserApiKeyChange,
  onGroqApiKeyChange,
}: any) => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Review Settings</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Review Type
        </label>
        <div className="border rounded">
          <select
            // value={reviewType}
            onChange={(e) => onReviewTypeChange(e.target.value)}
            className="w-full rounded p-2 border-r-8 border-solid border-transparent"
          >
            <option>Performance Review</option>
            <option>Self-Review</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          LLM Type
        </label>
        <div className="border rounded">
          <select
            // value={llmType}
            onChange={(e) => onLlmTypeChange(e.target.value)}
            className="w-full rounded p-2 border-r-8 border-solid border-transparent"
          >
            <option>openai</option>
            <option>google</option>
            <option>anthropic</option>
            <option>groq</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Model Size
        </label>
        <div className="border rounded">
          <select
            // value={modelSize}
            onChange={(e) => onModelSizeChange(e.target.value)}
            className="w-full rounded p-2 border-r-8 border-solid border-transparent"
          >
            <option>small</option>
            <option>medium</option>
            <option>large</option>
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Your API Key
        </label>
        <input
          type="password"
          // value={userApiKey}
          onChange={(e) => onUserApiKeyChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Groq API Key (optional)
        </label>
        <input
          type="password"
          // value={groqApiKey}
          onChange={(e) => onGroqApiKeyChange(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
    </div>
  );
};

export default Sidebar;
