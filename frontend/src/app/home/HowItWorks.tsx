import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <section className="relative isolate px-6 lg:px-8 widget-animate animate">
      <div className="mx-auto max-w-5xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-5xl">
            How It Works?
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            We have a very reasonable pricing
          </p>
          <div className="mt-12 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="m-auto h-full items-center"
              role="tablist"
              aria-orientation="horizontal"
            >
              <iframe
                // width="700"
                // height="443"
                className="rounded-lg lg:w-[700px] lg:h-[443px] md:w-[550px] md:h-[345px] sm:w-[450px] sm:h-[284px] w-[300px] h-[190px]"
                src="https://www.loom.com/embed/bc5863d58de248a3be5d37b087327420?sid=4e542a6a-cb1a-4a07-b1cf-a3119d0bb245"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
