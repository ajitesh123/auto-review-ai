'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '../../../contexts/AppContext';

export default function LoginCallback() {
  const { accessToken, setAccessToken, setUser } = useAppContext();
  const searchParams = useSearchParams();
  const router = useRouter();

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

    setAccessToken(token);
    setUser(userDetails);
    router.push('/');
  }, []);

  return (
    <div className="bg-background flex justify-center items-center h-[100vh] w-[100vw]">
      {/* <Spinner /> */}
      Logging in...
    </div>
  );
}
