import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};
const ContentBlock = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "bg-[#F7F8FA] shadow-sm rounded-md overflow-hidden h-full w-full",
        className
      )}
    >
      {children}
    </div>
  );
};

export default ContentBlock;
