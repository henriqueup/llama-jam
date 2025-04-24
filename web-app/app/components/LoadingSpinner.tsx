import { cn } from "../lib/utils";

interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className={cn("flex h-full w-full items-center justify-center", className)}>
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-lemon border-t-transparent" />
    </div>
  );
}
