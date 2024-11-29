import { useState } from 'react';
import { useAppContext } from '@contexts/AppContext';
import GradientBackground from './GradientBackground';
import { TextButton } from './ui/button';
import TickIcon from '@assets/icons/tick.svg';
import PopularIcon from '@assets/icons/popular.svg';
import { SvgIcon } from './ui/svg-icon';
import { isPerfReviewType } from '@constants/common';
import { login } from '@services/auth';
import { useRouter } from 'next/navigation';
import useStripeCheckout from 'src/hooks/useStripeCheckout';
import { useFlashMessage } from './ui/flash-messages';
import { SUBSCRIPTION_TIER } from '@constants/billing';

const Plans = {
  FREE: 'free',
  BASIC: process.env.NEXT_PUBLIC_STRIPE_BASIC_PLAN,
  PRO: process.env.NEXT_PUBLIC_STRIPE_PRO_PLAN,
};

const Pricing = () => {
  const { reviewType, accessToken } = useAppContext();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();
  const { redirectToCheckout, error } = useStripeCheckout();
  const { addFailureMessage } = useFlashMessage();

  const buyPlanClick = async (planId = '') => {
    if (!accessToken) {
      // user not logged in
      if (planId !== Plans.FREE) {
        localStorage.setItem('resume_billing_with_plan_id', planId);
      }

      const response = (await login()) as {
        login_url: string;
      };
      // login redirection
      router.push(response.login_url);
      return;
    }

    if (planId === Plans.FREE) {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      return;
    }

    // start the billing process
    try {
      setIsCheckingOut(true);
      await redirectToCheckout(planId);
    } catch (err) {
      console.log({ err });
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (error) {
    addFailureMessage({ message: error, autoClose: false });
  }

  const freePlan = SUBSCRIPTION_TIER['free'];
  const starterPlan = SUBSCRIPTION_TIER['starter'];
  const proPlan = SUBSCRIPTION_TIER['pro'];

  return (
    <section
      id="pricing"
      className="relative isolate px-6 lg:px-8 widget-animate animate"
    >
      <div className="mx-auto max-w-5xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight  sm:text-5xl">
            Pricing
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We have a very reasonable pricing
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-16">
            {/* Pricing cards..... */}
            <div className="grid md:grid-cols-3 px-8 gap-12 text-cardBg-800 mt-10">
            
              {/* Free Plan */}
              <div className="flex flex-col items-center bg-cardBg-800 p-8 rounded-lg shadow-lg max-w-full transition-transform duration-300 hover:scale-105">
                <div>
                  <h2 className="font-extrabold text-milk text-3xl text-center mb-2">
                    {freePlan.title}
                  </h2>
                  <p className="opacity-60 text-gray-300 text-center">
                    {freePlan.subtitle}
                  </p>
                  <div className="flex flex-col text-gray-300 items-center my-8">
                    <p className="font-extrabold text-4xl">{freePlan.price}</p>
                    {/* <p className="text-sm opacity-60">/month</p> */}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {freePlan.features.map((feature) => (
                    <p className="flex items-center gap-2 text-sm text-gray-300">
                      <SvgIcon svg={TickIcon} size="md" />
                      <b>{feature}</b>
                    </p>
                  ))}
                  <div className="flex justify-center mt-8 ">
                    <TextButton
                      variant={`primary-${
                        isPerfReviewType(reviewType) ? 'perf' : 'self'
                      }-review`}
                      className="font-semibold"
                      onClick={() => buyPlanClick(Plans.FREE)}
                      disabled={isCheckingOut}
                    >
                      Get Started
                    </TextButton>
                  </div>
                </div>
              </div>

              {/* Starter Plan */}
              <div className="flex flex-col items-center bg-cardBg-800 p-8 rounded-lg shadow-lg max-w-full transition-transform duration-300 hover:scale-105">
                <div>
                  <h2 className="font-extrabold text-milk text-3xl text-center mb-2">
                    {starterPlan.title}
                  </h2>
                  <p className="opacity-60 text-gray-300 text-center">
                    {starterPlan.subtitle}
                  </p>
                  <div className="flex flex-col text-gray-300 items-center my-8">
                    <p className="font-extrabold text-4xl">{starterPlan.price}</p>
                    {/* <p className="text-sm opacity-60">/month</p> */}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {starterPlan.features.map((feature) => (
                    <p className="flex items-center gap-2 text-sm text-gray-300">
                      <SvgIcon svg={TickIcon} size="md" />
                      <b>{feature}</b>
                    </p>
                  ))}
                  <div className="flex justify-center mt-8 ">
                    <TextButton
                      variant={`primary-${
                        isPerfReviewType(reviewType) ? 'perf' : 'self'
                      }-review`}
                      className="font-semibold"
                      onClick={() => buyPlanClick(Plans.BASIC)}
                      disabled={isCheckingOut}
                    >
                      Get Started
                    </TextButton>
                  </div>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="flex flex-col items-center bg-cardBg-800 p-8 rounded-lg shadow-lg relative border-8 border-orange-200 max-w-full transition-transform duration-300 hover:scale-105">
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
                    <p className="font-extrabold text-milk text-3xl mb-2">
                      {proPlan.title}
                    </p>
                  </div>
                  <p className="opacity-60 text-gray-300 text-center">
                    {proPlan.subtitle}
                  </p>
                  <p className="opacity-60 text-center"></p>
                  <div className="flex gap-4 justify-center">
                    <div className="flex flex-col text-gray-300 items-center my-8">
                      <p className="font-extrabold text-4xl">{proPlan.price}</p>
                      {/* <p className="text-sm opacity-60">/month</p> */}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {proPlan.features.map((feature) => (
                    <p className="flex items-center gap-2 text-sm text-gray-300">
                      <SvgIcon svg={TickIcon} size="md" />
                      <b>{feature}</b>
                    </p>
                  ))}
                  <div className="flex justify-center mt-8 ">
                    <TextButton
                      variant={`primary-${
                        isPerfReviewType(reviewType) ? 'perf' : 'self'
                      }-review`}
                      className="font-semibold"
                      onClick={() => buyPlanClick(Plans.PRO)}
                      disabled={isCheckingOut}
                    >
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
};

export default Pricing;
