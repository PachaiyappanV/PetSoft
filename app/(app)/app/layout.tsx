import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] flex flex-col mx-auto min-h-screen">
        <AppHeader />
        {children}
        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
