'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@contexts/AppContext';

export default function LogoutCallback() {
  const { setAccessToken, setUser } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    // removing localstorage keys
    localStorage.removeItem('perf_review_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('given_name');
    localStorage.removeItem('family_name');
    localStorage.removeItem('email');
    localStorage.removeItem('picture');

    // removing data from context api
    setAccessToken('');
    setUser({});

    router.push('/');
  }, []);

  return (
    <div className="bg-background flex justify-center items-center h-[100vh] w-[100vw]">
      {/* <Spinner /> */}
      Logging out...
    </div>
  );
}
