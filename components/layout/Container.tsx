import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Centralized max-width + horizontal padding wrapper so every
 * section stays aligned to the same editorial grid.
 */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-8xl px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
