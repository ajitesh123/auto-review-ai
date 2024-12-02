import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

const BillingAlerts = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  let transactionStatus = Number(
    searchParams?.get('subscription_success') ?? -1
  );

  useEffect(() => {
    localStorage.removeItem('resume_billing_with_plan_id');
  }, []);

  return (
    <>
      {transactionStatus === 1 && (
        <div
          className="bg-green-100 border max-w-5xl border-green-400 text-green-700 px-4 py-3 rounded relative mt-8"
          role="alert"
        >
          <strong className="font-bold mr-2">Great!</strong>
          <span className="block sm:inline pr-16">
            Your transaction has been successfull
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => router.replace('/billing')}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {transactionStatus === 0 && (
        <div
          className="bg-red-100 border max-w-5xl red-green-400 text-red-700 px-4 py-3 rounded relative mt-8"
          role="alert"
        >
          <strong className="font-bold mr-2">Uh Oh!</strong>
          <span className="block sm:inline pr-16">
            Your transaction was not successfull
          </span>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => router.replace('/billing')}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
    </>
  );
};

export default BillingAlerts;
