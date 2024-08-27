"use client";
import { Pet } from "@/lib/types";
import { ReactNode, createContext, useState } from "react";

type Props = {
  children: ReactNode;
  data: Pet[];
};

type TPetContext = {
  pets: Pet[];
  selectedPetId: string | null;
  selectedPet: Pet | undefined;
  handleChangeSelectedPetId: (id: string) => void;
  numberOfPets: number;
  handleCheckout: (id: string) => void;
};

export const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({ children, data }: Props) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);
  const numberOfPets = pets.length;

  //event handlers
  const handleChangeSelectedPetId = (id: string) => {
    setSelectedPetId(id);
  };

  const handleCheckout = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    setSelectedPetId(null);
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleChangeSelectedPetId,
        numberOfPets,
        handleCheckout,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
