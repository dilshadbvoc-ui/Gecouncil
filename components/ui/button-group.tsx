import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("inline-flex rounded-md shadow-sm", className)}
      role="group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && child.type === Button) {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn(
              "rounded-none",
              index === 0 && "rounded-l-md",
              index === React.Children.count(children) - 1 && "rounded-r-md",
              (child.props as any).className
            ),
          })
        }
        if (React.isValidElement(child) && child.type === Separator) {
          return child
        }
        return child
      })}
    </div>
  )
})
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
