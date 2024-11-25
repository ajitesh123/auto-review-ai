import { useCallback, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { fetchStripeCheckoutSession } from '@services/billing';

interface UseStripeCheckoutReturn {
  redirectToCheckout: (planId: string) => Promise<void>;
  error: string | null;
}

const useStripeCheckout = (): UseStripeCheckoutReturn => {
  const [error, setError] = useState<string | null>(null);

  // Function to handle initialization and redirection
  const redirectToCheckout = useCallback(
    async (planId: string): Promise<void> => {
      try {
        const stripe: Stripe | null = await loadStripe(
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
        );

        if (!stripe) {
          setError('Failed to initialize Stripe.');
          return;
        }

        const stripeCallbackUrl = process.env.NEXT_PUBLIC_STRIPE_CALLBACK_URL;
        const requestData = {
          price_id: planId,
          success_url: `${stripeCallbackUrl}?subscription_success=1`,
          cancel_url: `${stripeCallbackUrl}?subscription_success=0`,
        };

        const sessionResponse = (await fetchStripeCheckoutSession(
          requestData
        )) as any;

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionResponse.session_id,
        });
        if (error) {
          setError((error as unknown as Error).message);
        }
      } catch (err) {
        setError((err as Error).message);
      }
    },
    []
  );

  return { redirectToCheckout, error };
};

export default useStripeCheckout;
