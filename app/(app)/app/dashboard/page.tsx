import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import PetList from "@/components/pet-list";
import SearchForm from "@/components/search-form";
import Stats from "@/components/stats";

const page = async () => {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets"
  );

  if (!response.ok) {
    throw new Error("Could not fetch pets");
  }

  const pets = await response.json();
  return (
    <main>
      <div className="flex items-center justify-between text-white py-8">
        <Branding />
        <Stats />
      </div>
      <div
        className="grid md:grid-cols-3 md:grid-rows-[45px_1fr] 
      grid-rows-[45px_300px_500px] gap-4 md:h-[600px]"
      >
        <div className="md:row-start-1 md:row-span-1 md:col-start-1 md:col-span-1">
          <SearchForm />
        </div>
        <div className=" md:row-start-2 md:row-span-full md:col-start-1 md:col-span-1">
          <ContentBlock>
            <PetList pets={pets} />
          </ContentBlock>
        </div>
        <div className="md:row-start-1 md:row-span-full md:col-start-2 md:col-span-full">
          <ContentBlock>petdetails</ContentBlock>
        </div>
      </div>
    </main>
  );
};

export default page;
