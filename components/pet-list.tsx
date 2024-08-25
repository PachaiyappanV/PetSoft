"use client";
import { PetContext } from "@/contexts/pet-context-provider";
import Image from "next/image";
import { useContext } from "react";

const PetList = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }
  const { pets } = context;
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {pets.map((pet) => (
        <li key={pet.id}>
          <button
            className="flex items-center h-[70px] w-full cursor-pointer px-5 
          text-base gap-3 hover:bg-[#EFF1F2] focus:bg-[#EFF1F2] transition"
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
