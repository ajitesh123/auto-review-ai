import { Badge } from "@components/ui/badge";
import TickIcon from '@assets/icons/tick.svg';
import { UserDetails } from "../../../types/user";
import { SUBSCRIPTION_TIER } from "@constants/billing";
import { SvgIcon } from "@components/ui/svg-icon";

interface Props {
  userDetails: UserDetails
}
const CurrentPlanDetails = ({ userDetails }: Props) => {

  const tier = SUBSCRIPTION_TIER[userDetails?.subscription_tier];

  return (
    <div className="flex flex-row w-full justify-between p-8 rounded-2xl border border-[#2F6846] bg-gradient-to-b from-[#191919] to-[#111111] gap-16">
      <div className="inline-flex flex-col gap-2 w-1/2">
        <div>
          <Badge variant="green" className="p-1.5 !px-2">
            <span>Currently Active</span>
          </Badge>
        </div>
        <span className="text-2xl font-bold">
          {tier?.title ?? "FREE"} Plan
        </span>
        <div className="flex flex-col gap-0">
          <div className="flex gap-1">
            <span className="text-[#B4B4B4] text-md flex items-center gap-1.5">
              {`Total Reviews${userDetails?.subscription_tier === 'free' ? '' : ' Purchased'}:`}
            </span>  
            <span className="text-lg text-milk flex items-center gap-1.5">
              {userDetails.total_credits_purchased}
            </span>  
          </div>
          <div className="flex gap-1">
            <span className="text-[#B4B4B4] text-md flex items-center gap-1.5">
              Reviews Used:
            </span>  
            <span className="text-lg text-milk flex items-center gap-1.5">
              {userDetails.api_calls_count}
            </span>  
          </div>
          <div className="flex gap-1">
            <span className="text-[#B4B4B4] text-md flex items-center gap-1.5">
              Remaining Reviews:
            </span>  
            <span className="text-lg text-milk flex items-center gap-1.5">
              {userDetails.remaining_credits}
            </span>  
          </div>
        </div>

        {/* <div className="flex items-center gap-2">
          <Link href={"https://www.getarchieai.com/#pricing"}>
            <TextButton variant={"secondary"} size="md">Other pricing options</TextButton>
          </Link>
        </div> */}
      </div>
      <div className="flex flex-col gap-2 w-1/2">
        <span className="text-xs text-[#7B7B7B]">
          Everything listed below
        </span>
        <div className="flex justify-start flex-col gap-2">
          {tier.features.map((feature) => (
            <span className="text-[#B4B4B4] text-xs flex items-center gap-1.5">
              <SvgIcon svg={TickIcon} size="md" />
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CurrentPlanDetails;
