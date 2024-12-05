import React from 'react';
import remarkGfm from 'remark-gfm';
import Markdown from 'react-markdown';

type Props = {
  content: string;
  className?: string;
};

const CustomMarkdown = ({ content, className }: Props) => {
  return (
    <Markdown
      className={'prose dark:prose-invert w-[95%] ' + className}
      components={{
        a: ({ node, ...props }) => <a className="text-white" {...props} />,
        p: ({ node, ...props }) => <p className="text-slate-300" {...props} />,
        strong: ({ node, ...props }) => (
          <strong className="text-white" {...props} />
        ),
        li: ({ node, ...props }) => (
          <li className="text-slate-300" {...props} />
        ),
      }}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </Markdown>
  );
};

export default CustomMarkdown;
