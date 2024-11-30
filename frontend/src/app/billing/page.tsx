'use client';

import React, { useEffect, useState } from 'react';
import AuthWrapper from '@app/AuthWrapper';
import BillingAlerts from './components/BillingAlerts';
import { Spinner } from '@components/ui/spinner';
// import { fetchBillingCredits } from '@services/billing';
import { useFlashMessage } from '@components/ui/flash-messages';
import { fetchUserDetails } from '@services/user';
import { UserDetails } from '../../types/user';
import CurrentPlanDetails from './components/CurrentPlanDetails';

export default function Billing() {
  const [isLoading, setIsLoading] = useState(true);
  const { addFailureMessage } = useFlashMessage();
  const [ userDetails, setUserDetails] = useState({} as UserDetails);

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = (await fetchUserDetails()) as UserDetails;
        console.log('user details ', response);
        setUserDetails(response);
      } catch (error: any) {
        const errMsg =
          error?.message || 'An error occurred while fetching the billing credits.';
        addFailureMessage({ message: errMsg, autoClose: false });
      } finally {
        setIsLoading(false);
      }
    }

    fetchCredits();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <AuthWrapper>
      <div className="flex flex-col overflow-y-auto max-w-7xl mx-auto p-4 items-center justify-center">

        {/* Billing alerts */}
        <BillingAlerts />

        <div
          className="flex flex-col items-start justify-start w-full  gap-2 py-4 my-2">
            <div className="text-2xl font-bold">Plans and Billing</div>
            <div className="text-sm font-semibold text-[#B4B4B4]">
              Manage your billing information and invoices. For questions about billing, contact{" "}
              <span className="italic font-semibold text-perfReview-500">support@perfreviewai.com</span>
            </div>
        </div>

        {/* Previous Transactions */}
        {/* <div className="flex flex-col w-full gap-4 my-4 ">
          <div className="border border-[#2A2A2A] bg-zinc-900 rounded-md">
            <div className="flex flex-col items-start justify-start w-full  gap-1 p-4 border-b border-[#2A2A2A] ">
              <div className="text-lg text-[#EEEEEE]">Previous Transactions</div>
              <div className="text-xs font-bold  text-[#7B7B7B]">Download your previous plan receipts and usage details.</div>
            </div>
            <div className="inline-block min-w-full overflow-x-auto  ">
              <div className="overflow-hidden shadow  rounded-md">
                <div className="text-center w-full text-gray-300 my-8">No Invoices available</div>
              </div>
            </div>
          </div>
        </div> */}

        {/* Current plan details */}
        <CurrentPlanDetails userDetails={userDetails} />
      </div>
    </AuthWrapper>
  );
}
