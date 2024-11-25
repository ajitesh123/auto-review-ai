'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '../../../contexts/AppContext';
import useStripeCheckout from 'src/hooks/useStripeCheckout';

function LoginCallback() {
  const { setAccessToken, setUser } = useAppContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { redirectToCheckout } = useStripeCheckout();

  useEffect(() => {
    console.log('In LoginCallback useEffect', searchParams);
    const redirectionRoute = searchParams?.get('route') || 'home';

    // Todo: Need to evaluate this piece of code
    const nextRoute =
      {
        home: '/',
        login: '/login',
      }[redirectionRoute] || '/';
    const error = searchParams?.get('error');
    if (!!error) {
      console.error('Error while logging in:', error);
      router.push(nextRoute);
      return;
    }

    const token = searchParams?.get('token') as string;
    const user = searchParams?.get('user')?.replace(/'/g, '"') as string;

    const userDetails = JSON.parse(user);

    localStorage.setItem('perf_review_token', token);
    localStorage.setItem('user_id', userDetails['id']);
    localStorage.setItem('given_name', userDetails['given_name']);
    localStorage.setItem('family_name', userDetails['family_name']);
    localStorage.setItem('email', userDetails['email']);
    localStorage.setItem('picture', userDetails['picture']);

    // setting data in context provider
    setAccessToken(token);
    setUser(userDetails);

    const resumeBillingWithPlanId =
      localStorage.getItem('resume_billing_with_plan_id') || null;
    if (!resumeBillingWithPlanId) {
      // redirect to dashboard
      router.push('/');
    } else {
      try {
        const doStartBillingProcess = async (planId = '') => {
          // redirect to stripe checkout
          await redirectToCheckout(planId);
        };
        doStartBillingProcess(resumeBillingWithPlanId);
      } catch (err) {
        console.log({ err });
        // redirect to dashboard
        router.push('/');
      }
    }
  }, [searchParams, redirectToCheckout]);

  return (
    <div className="bg-background flex justify-center items-center h-[100vh] w-[100vw]">
      {/* <Spinner /> */}
      Logging in...
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginCallback />
    </Suspense>
  );
}
