import AppFooter from "@/components/app-footer";
import AppHeader from "@/components/app-header";
import BackgroundPattern from "@/components/background-pattern";
import PetContextProvider from "@/contexts/pet-context-provider";
import SearchContextProvider from "@/contexts/search-context-provider";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }

  const data = await response.json();
  console.log(data);
  return (
    <>
      <BackgroundPattern />
      <div className="max-w-[1050px] flex flex-col mx-auto min-h-screen px-4">
        <AppHeader />
        <SearchContextProvider>
          <PetContextProvider data={data}>{children}</PetContextProvider>
        </SearchContextProvider>

        <AppFooter />
      </div>
    </>
  );
};

export default Layout;
