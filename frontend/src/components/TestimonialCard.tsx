import Image, { StaticImageData } from "next/image"

interface TestimonialProps {
  testimonial: {
    reviewer_name: string,
    reviewer_img: StaticImageData,
    review_text: string
  }
}

const TestimonialCard = ({ testimonial } : TestimonialProps) => {
  return (
    <div className="w-full mx-auto rounded-lg bg-zinc-800 border border-slate-800 p-5  font-light mb-5 widget-animate animate">
      <div className="w-full flex mb-4 items-center">
        <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
          <Image src={testimonial.reviewer_img} alt="reviewer image" />
        </div>
        <div className="flex flex-grow pl-3">
          <h6 className="font-bold text-sm self-start">{testimonial.reviewer_name}</h6>
        </div>
      </div>
      <div className="flex w-full">
        <p className="text-sm leading-tight text-start text-slate-300"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>{testimonial.review_text}<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
      </div>
    </div>
  )
}

export default TestimonialCard;
