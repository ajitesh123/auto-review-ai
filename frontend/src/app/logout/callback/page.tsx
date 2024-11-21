'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// relative imports are used, facing some issues with absolute imports
import { useAppContext } from '../../../contexts/AppContext';
import type { User } from '../../../types/user';

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
    localStorage.removeItem('resume_billing_with_plan_id');

    // removing data from context api
    setAccessToken('');
    setUser({} as User);

    router.push('/');
  }, []);

  return (
    <div className="bg-background flex justify-center items-center h-[100vh] w-[100vw]">
      {/* <Spinner /> */}
      Logging out...
    </div>
  );
}
