
// reviewers images
import Kunal_Mishra from '@assets/images/testimonials/kunal_mishra.jpeg';
import Mayank_Raj from '@assets/images/testimonials/mayank_raj.jpeg';
import Anmol_Sinha from '@assets/images/testimonials/anmol_sinha.png';
import Kushal_Poddar from '@assets/images/testimonials/kushal_poddar.jpeg';
import Avinash_Malik from '@assets/images/testimonials/avinash_malik.jpeg';
import Shan_S from '@assets/images/testimonials/shan_s.jpeg';
import TestimonialCard from '@components/TestimonialCard';

const testimonials = [
  {
    reviewer_name: "Kunal Mishra",
    reviewer_img: Kunal_Mishra,
    review_text: "Archie's ability to explain complex features in simpler terms or even pseudocode has been a game-changer for our cross-functional team collaboration."
  },
  {
    reviewer_name: "Anmol Sinha",
    reviewer_img: Anmol_Sinha,
    review_text: "As a Python developer working on a Golang project, Archie's code translation feature has been my lifesaver. It's like having a personal tutor."
  },
  // {
  //   reviewer_name: "IK",
  //   reviewer_img: Kunal_Mishra,
  //   review_text: "For Interview Kickstart, we explored using AI tools and Archie AI stood out for being able to onboard new developers, understand code and making their first commit. The features are amazing!"
  // },
  {
    reviewer_name: "Avinash Malik",
    reviewer_img: Avinash_Malik,
    review_text: "As a Technical Architect, I find Q&A feature very helpful, It helps me a lot in choosing the right tools and library for my current and planned projects. Another amazing feature is Auto-Snippet which helps me understand the complex code snippets."
  },
  {
    reviewer_name: "Mayank Raj",
    reviewer_img: Mayank_Raj,
    review_text: "The Q&A feature has dramatically reduced the time I spend digging through documentation. It's like having instant access to a Senior Dev who is expert on the codebase."
  },
  {
    reviewer_name: "Shan S.",
    reviewer_img: Shan_S,
    review_text: "As a tech lead, Archie's summarization feature has been invaluable for quickly getting an overview of different modules and making informed decisions."
  },
  // {
  //   reviewer_name: "Diago",
  //   reviewer_img: Kunal_Mishra,
  //   review_text: "We tried Archie AI and loved it for its usability and code explanation. Looking forward to partnering with Archie to build next set of features for consulting vertical."
  // },
  {
    reviewer_name: "Kushal Poddar",
    reviewer_img: Kushal_Poddar,
    review_text: "ArchieAI has been a wonderful tool to implement code features quite easily. Our developers at Idyll has been using it consistently to make changes quite effortlessly. Loved the auto commit and PR Review feature."
  }
];

const Testimonials = () => {

  return (
    <section className="border-y-2 border-slate-800 relative isolate px-6 lg:px-8 widget-animate animate bg-background mt-12">
      <div className="mx-auto max-w-4xl  py-12 sm:py-18 lg:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Loved by Managers
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-300">We are proud to have helped managers all over the world.</p>
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
  )
}

export default Testimonials;
