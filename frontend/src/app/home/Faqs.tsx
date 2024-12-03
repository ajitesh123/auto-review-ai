interface FaqItem {
  faqItem: {
    question: string;
    answer: string;
  };
}

const faqItems = [
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, dignissimos. Neque eos, dignissimos provident reiciendis debitis repudiandae commodi perferendis et itaque, similique fugiat cumque impedit iusto vitae dolorum. Nostrum, fugit!',
  },
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, dignissimos. Neque eos, dignissimos provident reiciendis debitis repudiandae commodi perferendis et itaque, similique fugiat cumque impedit iusto vitae dolorum. Nostrum, fugit!',
  },
  {
    question: 'Lorem ipsum dolor sit amet?',
    answer:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, dignissimos. Neque eos, dignissimos provident reiciendis debitis repudiandae commodi perferendis et itaque, similique fugiat cumque impedit iusto vitae dolorum. Nostrum, fugit!',
  },
];

const FaqItem = ({ faqItem }: FaqItem) => {
  return (
    <div className="mt-4 flex">
      <div>
        <div className="flex items-center h-12 border-l-4 border-white">
          <span className="text-4xl text-white px-4">Q.</span>
        </div>
        <div className="flex items-center h-12 border-l-4 border-gray-400">
          <span className="text-4xl text-gray-400 px-4">A.</span>
        </div>
      </div>
      <div>
        <div className="flex items-center h-12">
          <span className="text-lg text-slate-300 font-bold">
            {faqItem.question}
          </span>
        </div>
        <div className="flex items-center py-2">
          <span className="text-gray-500">{faqItem.answer}</span>
        </div>
      </div>
    </div>
  );
};

const Faqs = () => {
  return (
    <section className="relative isolate widget-animate animate in-view mt-12 mb-12 md:mb-24 px-6 lg:px-8">
      <div className="mx-auto border-2 rounded-lg bg-zinc-900 border-slate-800 w-full lg:max-w-5xl">
        <div className="p-4 rounded-lg shadow-xl pb-8 mt-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-5xl">
              FAQs
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Here are some of the frequently asked questions
            </p>
          </div>
          <div className="space-y-12 px-2 xl:px-16 mt-16">
            {faqItems.map((faqItem, index) => (
              <FaqItem key={index} faqItem={faqItem} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
