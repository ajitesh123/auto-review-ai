// const SUBSCRIPTION_TIER:  { [key: string]: object } = {
//   free: 'FREE',
//   starter: 'STARTER',
//   pro: 'PRO'
// };

interface Tier {
  price: string,
  title: string,
  subtitle: string,
  features: string[]
}

const SUBSCRIPTION_TIER:  { [key: string]: Tier } = {
  free: {
    price: '$0',
    title: 'Free',
    subtitle: 'To get you started',
    features: [
      'Basic Performance Reviews',
      'Basic Self Reviews',
      'Slow LLMs',
      'Voice Enabled'
    ]
  },
  starter: {
    price: '$2',
    title: 'Starter',
    subtitle: 'To get you started',
    features: [
      '5 Performance Reviews',
      '5 Self Reviews',
      'Advanced LLMs',
      'Voice Enabled'
    ]
  },
  pro: {
    price: '$5',
    title: 'Pro',
    subtitle: 'Best money saver plan',
    features: [
      '15 Performance Reviews',
      '15 Self Reviews',
      'More Advanced LLMs',
      'AI Voice Enabled'
    ]
  },
};

export { SUBSCRIPTION_TIER };
