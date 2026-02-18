import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const InputGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex w-full items-center", className)}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === Input || child.type === Textarea) {
            return React.cloneElement(child as React.ReactElement<any>, {
              className: cn(
                "rounded-none",
                index === 0 && "rounded-l-md",
                index === React.Children.count(children) - 1 && "rounded-r-md",
                (child.props as any).className
              ),
            })
          }
          if (child.type === Button || child.type === InputGroupAddon) {
            return child
          }
        }
        return child
      })}
    </div>
  )
})
InputGroup.displayName = "InputGroup"

const InputGroupAddon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
InputGroupAddon.displayName = "InputGroupAddon"

export { InputGroup, InputGroupAddon }
