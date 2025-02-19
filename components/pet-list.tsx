"use client";
import { usePetContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import Image from "next/image";

const PetList = () => {
  const { pets, handleChangeSelectedPetId, selectedPetId } = usePetContext();
  const { searchQuery } = useSearchContext();

  const filterdPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filterdPets.length === 0 ? (
    <p className="text-black h-full w-full flex items-center justify-center font-medium">
      Add a pet to your daycare
    </p>
  ) : (
    <ul className="bg-white">
      {filterdPets.map((pet) => (
        <li key={pet.id}>
          <button
            onClick={() => handleChangeSelectedPetId(pet.id)}
            className={cn(
              "flex items-center h-[70px] w-full cursor-pointer px-5 text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition",
              {
                "bg-[#EFF1F2]": selectedPetId === pet.id,
              }
            )}
          >
            <Image
              src={pet.imageUrl}
              alt="Pet image"
              width={45}
              height={45}
              className="w-[45px] h-[45px] rounded-full object-cover"
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
};
export default PetList;
