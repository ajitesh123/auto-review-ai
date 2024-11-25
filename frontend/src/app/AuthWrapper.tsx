'use client';

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';
import { Spinner } from '@components/ui/spinner';

type Props = {
  children: React.ReactNode;
};

const AuthWrapper = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const perf_review_token = localStorage.getItem('perf_review_token') || null;
    // const user_id = localStorage.getItem("user_id") || null;
    // const given_name = localStorage.getItem("given_name") || null;
    // const family_name = localStorage.getItem("family_name") || null;
    // const email = localStorage.getItem("email") || null;
    // const picture = localStorage.getItem("picture") || null;

    if (!localStorage || !perf_review_token) {
      redirect('/');
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthWrapper;
