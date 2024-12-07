// reviewers images
import Kunal_Mishra from '@assets/images/testimonials/kunal_mishra.jpeg';
import Mayank_Raj from '@assets/images/testimonials/mayank_raj.jpeg';
import Anmol_Sinha from '@assets/images/testimonials/anmol_sinha.png';
import Jinal_Dalal from '@assets/images/testimonials/jinal_dalal.jpeg';
import Avinash_Malik from '@assets/images/testimonials/avinash_malik.jpeg';
import Thomas_Nguyen from '@assets/images/testimonials/thomas_nguyen.jpg';
import TestimonialCard from '@components/TestimonialCard';

const testimonials = [
  {
    reviewer_name: 'Thomas Nguyen',
    reviewer_img: Thomas_Nguyen,
    review_text:
      "OpenHR AI has significantly reduced the time I spend on administrative tasks. The AI-generated performance reviews are insightful and personalized. The voice-first feature is incredibly convenient. It's an indispensable tool for any manager.",
  },
  {
    reviewer_name: 'Kunal Mishra',
    reviewer_img: Kunal_Mishra,
    review_text:
      'Completing self-reviews has never been easier. The intuitive interface guides me through the process, ensuring I provide all the necessary information without any hassle.',
  },
  {
    reviewer_name: 'Anmol Sinha',
    reviewer_img: Anmol_Sinha,
    review_text:
      "The reasonable pricing plans make it accessible for teams of all sizes. We've upgraded to the Pro plan and have significantly enhanced our review process.",
  },
  {
    reviewer_name: 'Avinash Malik',
    reviewer_img: Avinash_Malik,
    review_text:
      'The voice-first feature is a game-changer. I can record feedback on the go, making it easier to provide timely and meaningful reviews to my team members.',
  },
  {
    reviewer_name: 'Mayank Raj',
    reviewer_img: Mayank_Raj,
    review_text:
      "Writing self-reviews was always a chore for me. With OpenHR AI, it's a breeze. The AI helps me articulate my achievements effectively. It's user-friendly and incredibly efficient.",
  },
  {
    reviewer_name: 'Jinal Dalal',
    reviewer_img: Jinal_Dalal,
    review_text:
      "I was skeptical about using AI for performance reviews, but OpenHR AI exceeded my expectations. The quality of the reviews is exceptional, and the platform is user-friendly. It's a must-have for any organization looking to modernize their HR processes.",
  },
];

const Testimonials = () => {
  return (
    <section className="border-y-2 border-slate-800 relative isolate px-6 lg:px-8 widget-animate animate bg-background mt-12">
      <div className="mx-auto max-w-4xl py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Loved by Managers
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-300">
            We are proud to have helped managers all over the world.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-16">
            <div className="md:flex items-start gap-5">
              <div className="md:w-1/3">
                <TestimonialCard testimonial={testimonials[0]} />
                <TestimonialCard testimonial={testimonials[1]} />
              </div>
              <div className="md:w-1/3">
                <TestimonialCard testimonial={testimonials[2]} />
                <TestimonialCard testimonial={testimonials[3]} />
              </div>
              <div className=" md:w-1/3">
                <TestimonialCard testimonial={testimonials[4]} />
                <TestimonialCard testimonial={testimonials[5]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
