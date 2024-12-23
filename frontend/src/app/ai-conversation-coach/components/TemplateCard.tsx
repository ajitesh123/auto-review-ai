import React from 'react';

import { SvgIcon } from '@components/ui/svg-icon';
import MicrophoneIcon from '@assets/icons/mic_new.svg';

const TemplateCard = ({ template, onClick }: any) => {
  return (
    <div
      onClick={() => onClick(template)}
      className="w-full border border-gray-800 group relative cursor-pointer p-4 overflow-hidden bg-zinc-900  shadow-xl ring-1 ring-gray-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:mx-auto sm:rounded-lg"
    >
      <span className="absolute top-4 z-0 h-16 w-16 rounded-full bg-zinc-800 transition-all duration-300 group-hover:scale-[12]"></span>
      <div className="relative mx-auto max-w-md">
        <div className="flex flex-row items-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-zinc-800 transition-all duration-300 group-hover:bg-zinc-900">
            <SvgIcon svg={MicrophoneIcon} className="h-8 w-8 text-white" />
          </span>
          <span className="text-lg font-mono text-white transition-all duration-300 pl-4">
            {template.name}
          </span>
        </div>
        <div className="space-y-6 pt-5 h-28 text-base leading-7 text-gray-400 transition-all duration-300 group-hover:text-white/90">
          <p>{template.description}</p>
        </div>
        <div className="pt-5 text-base font-semibold leading-7">
          <p>
            <a
              href="#"
              className="text-white font-mono transition-all duration-300 group-hover:text-white"
            >
              Try It Now &rarr;
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
