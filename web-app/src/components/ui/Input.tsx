import * as React from "react";

import { cn } from "../utils";

const BaseInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-accent bg-background px-3 py-2 text-base ring-offset-background",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label = "", ...props }, ref) => {
    if (!label) return <BaseInput ref={ref} {...props} />;

    const id = props.id ?? label;

    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="text-sm px-2">
          {label}
        </label>
        <BaseInput ref={ref} {...props} id={id} />
      </div>
    );
  }
);
Input.displayName = "Input";

type DebouncedProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputProps, "onChange">;

const DebouncedInput = React.forwardRef<HTMLInputElement, DebouncedProps>(
  ({ value: initialValue, onChange, debounce = 500, ...props }, ref) => {
    const [value, setValue] = React.useState(initialValue);

    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);

      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }
);
DebouncedInput.displayName = "DebouncedInput";

export { DebouncedInput, Input };
