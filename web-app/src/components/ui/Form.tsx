import * as FormPrimitive from "@radix-ui/react-form";
import * as React from "react";
import { cn } from "../utils";

const Form = FormPrimitive.Root;

const FormField = FormPrimitive.Field;

const FormLabel = React.forwardRef<
  React.ComponentRef<typeof FormPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Label>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Label
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
FormLabel.displayName = FormPrimitive.Label.displayName;

const FormControl = React.forwardRef<
  React.ComponentRef<typeof FormPrimitive.Control>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Control>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Control
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
));
FormControl.displayName = FormPrimitive.Control.displayName;

const FormMessage = React.forwardRef<
  React.ComponentRef<typeof FormPrimitive.Message>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Message>
>(({ className, children, ...props }, ref) => (
  <FormPrimitive.Message
    ref={ref}
    className={cn("text-sm font-medium text-destructive mt-2", className)}
    {...props}
  >
    {children}
  </FormPrimitive.Message>
));
FormMessage.displayName = FormPrimitive.Message.displayName;

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
FormDescription.displayName = "FormDescription";

const FormSubmit = React.forwardRef<
  React.ComponentRef<typeof FormPrimitive.Submit>,
  React.ComponentPropsWithoutRef<typeof FormPrimitive.Submit>
>(({ className, ...props }, ref) => (
  <FormPrimitive.Submit
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2",
      className
    )}
    {...props}
  />
));
FormSubmit.displayName = FormPrimitive.Submit.displayName;

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
};
