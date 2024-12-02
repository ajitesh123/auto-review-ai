interface Tier {
  price: string;
  title: string;
  subtitle: string;
  features: string[];
}

const SUBSCRIPTION_TIER: { [key: string]: Tier } = {
  free: {
    price: '$0',
    title: 'Free',
    subtitle: 'The basic features of AI reviews',
    features: ['3 Basic AI Reviews', 'Slow LLMs', 'Voice Enabled'],
  },
  starter: {
    price: '$2',
    title: 'Starter',
    subtitle: 'To get you started',
    features: [
      '10 Advanced AI Reviews',
      'More Advanced LLMs',
      'AI Voice Enabled',
    ],
  },
  pro: {
    price: '$5',
    title: 'Pro',
    subtitle: 'Best money saver plan',
    features: [
      '30 Advanced AI Reviews',
      'More Advanced LLMs',
      'AI Voice Enabled',
    ],
  },
};

export { SUBSCRIPTION_TIER };
