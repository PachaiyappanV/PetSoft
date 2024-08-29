import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import prisma from "@/lib/db";
import { ReactNode } from "react";
type Props = {
  children: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const pets = await prisma.pet.findMany();
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] flex flex-col mx-auto min-h-screen px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
