import Logo from "@/components/logo";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-y-5">
      <Logo />
      {children}
    </div>
  );
};

export default Layout;
