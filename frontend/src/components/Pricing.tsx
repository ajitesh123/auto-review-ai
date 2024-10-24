import { useAppContext } from "@contexts/AppContext";
import GradientBackground from "./GradientBackground";
import { TextButton } from "./ui/button";
import TickIcon from '@assets/icons/tick.svg';
import PopularIcon from '@assets/icons/popular.svg';
import { SvgIcon } from "./ui/svg-icon";
import { isPerfReviewType } from "@constants/common";

const Pricing = () => {
  const { reviewType } = useAppContext();
  return (
    <section id="pricing" className="relative isolate px-6 lg:px-8 widget-animate animate">
      <div className="mx-auto max-w-4xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight  sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We have a very reasonable pricing
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-16">
            {/* Pricing cards..... */}
            <div className="grid md:grid-cols-2 px-8 gap-10 text-cardBg-800 mt-10">
              <div className="flex flex-col items-center bg-cardBg-800 p-8 rounded-lg shadow-lg max-w-sm transition-transform duration-300 hover:scale-105">
                <div>
                  <h2 className="font-extrabold text-milk text-3xl text-center mb-2">
                    Starter
                  </h2>
                  <p className="opacity-60 text-gray-300 text-center">
                    For the individual and small teams
                  </p>
                  <div className="flex flex-col text-gray-300 items-center my-8">
                    <p className="font-extrabold text-4xl">$2</p>
                    <p className="text-sm opacity-60">/month</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="flex items-center gap-2 text-sm text-gray-300">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>5 Performance Reviews</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>5 Self Reviews</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>Advanced LLMs</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>Voice Enabled</b>
                  </p>
                  <div className="flex justify-center mt-8 ">
                    <TextButton 
                      variant={`primary-${
                        isPerfReviewType(reviewType) ? 'perf' : 'self'
                      }-review`}
                     className="font-semibold">
                      Get Started
                    </TextButton>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center bg-cardBg-800 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 max-w-sm transition-transform duration-300 hover:scale-105">
              {/* <div className="flex flex-col items-center bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 max-w-sm"> */}
                <SvgIcon 
                  svg={PopularIcon}
                  className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
                />
                <p className="text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
                  POPULAR
                </p>
                <div>
                  <div className="flex gap-4 justify-center">
                    <p className="font-extrabold text-milk text-3xl mb-2">Pro</p>
                  </div>
                  <p className="opacity-60 text-gray-300 text-center">
                    For agencies and businesses
                  </p>
                  <p className="opacity-60 text-center"></p>
                  <div className="flex gap-4 justify-center">
                    <div className="flex flex-col text-gray-300 items-center my-8">
                      <p className="font-extrabold text-4xl">$9</p>
                      <p className="text-sm opacity-60">/month</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                <p className="flex items-center gap-2 text-sm text-gray-300">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>15 Performance Reviews</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>15 Self Reviews</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>More Advanced LLMs</b>
                  </p>
                  <p className="flex items-center gap-2 text-gray-300 text-sm">
                    <SvgIcon svg={TickIcon} size="md" />
                    <b>AI Voice Enabled</b>
                  </p>
                  <div className="flex justify-center mt-8 ">
                    <TextButton 
                      variant={`primary-${
                        isPerfReviewType(reviewType) ? 'perf' : 'self'
                      }-review`}
                     className="font-semibold">
                      Get Started
                    </TextButton>
                  </div>
                </div>
              </div>
            </div>
            {/* Ends..... */}
          </div>
        </div>
      </div>
      {/* <GradientBackground reviewType={reviewType} /> */}
    </section>
  );
}

export default Pricing;
