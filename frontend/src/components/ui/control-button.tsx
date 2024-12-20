import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "../../lib/utils"
import { buildClassNames } from '@utils/classnames';

type ButtonVariant = 'default' | 'play' | 'mic' | 'outlined' | 'connected';
type ButtonSize = 'default';

const controlButtonVariants = cva(
  "flex items-center justify-center transition-all duration-200 ease-in-out select-none relative",
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--Neutral-20)]",
          "text-white",
          "border border-white/10",
          "backdrop-blur-[8px]",
          "animate-[opacity-pulse_3s_ease-in_infinite]",
          "hover:bg-[var(--Neutral-15)]",
          "hover:border-white/20",
          "hover:translate-y-[-1px]",
          "active:translate-y-0",
          "focus:border-2 focus:border-[var(--Neutral-20)]",
          "focus:outline focus:outline-2 focus:outline-[var(--Neutral-80)]",
        ],
        play: [
          "bg-[var(--Blue-500)]",
          "text-[var(--Neutral-5)]",
          "border border-white/10",
          "backdrop-blur-[8px]",
          "animate-[opacity-pulse_3s_ease-in_infinite]",
          "hover:bg-[var(--Blue-600)]",
          "hover:border-white/20",
          "hover:translate-y-[-1px]",
          "active:translate-y-0",
          "focus:border-2 focus:border-[var(--Neutral-20)]",
          "focus:outline focus:outline-2 focus:outline-[var(--Neutral-80)]",
          "after:absolute after:-inset-[2px]",
          "after:rounded-[16px]",
          "after:bg-[var(--Blue-500)]",
          "after:opacity-20 after:-z-10",
          "after:animate-[pulse-attention_2s_infinite]",
        ],
        mic: [
          "bg-[var(--accent-red)]",
          "text-black",
          "hover:bg-[var(--Red-600)]",
          "before:absolute",
          "before:z-[-1]",
          "before:top-[calc(var(--volume)*-1)]",
          "before:left-[calc(var(--volume)*-1)]",
          "before:w-[calc(100%+var(--volume)*2)]",
          "before:h-[calc(100%+var(--volume)*2)]",
          "before:bg-[var(--Red-500)]",
          "before:opacity-35",
          "before:rounded-[14px]",
          "before:transition-all",
          "before:duration-20",
          "before:content-['']",
        ],
        outlined: [
          "bg-[var(--Neutral-2)]",
          "border border-[var(--Neutral-20)]",
          "pointer-events-none"
        ],
        connected: [
          "bg-[var(--Blue-800)]",
          "text-[var(--Blue-500)]",
          "hover:border-[var(--Blue-500)]"
        ],
      } as Record<ButtonVariant, string[]>,
      size: {
        default: "w-[38px] h-[38px] rounded-[14px]"
      } as Record<ButtonSize, string>
    },
    defaultVariants: {
      variant: "default" as ButtonVariant,
      size: "default" as ButtonSize,
    },
  }
)

export interface ControlButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof controlButtonVariants> {
  asChild?: boolean
}

const ControlButton = React.forwardRef<HTMLButtonElement, ControlButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={buildClassNames(controlButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
ControlButton.displayName = "ControlButton"

export { ControlButton, controlButtonVariants } 