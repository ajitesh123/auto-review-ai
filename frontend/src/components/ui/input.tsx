import * as React from "react"
import { buildClassNames } from "@utils/classnames"

export interface InputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const baseStyles = "flex min-h-10 w-full rounded-md border border-neutral-800 bg-black"
const paddingStyles = "px-3 py-2"
const textStyles = "text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground"
const focusStyles = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
const stateStyles = "disabled:cursor-not-allowed disabled:opacity-50"

const Input = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={buildClassNames(
          baseStyles,
          paddingStyles,
          textStyles,
          focusStyles,
          stateStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input } 
