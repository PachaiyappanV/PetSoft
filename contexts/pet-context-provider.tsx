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
};

export const PetContext = createContext<TPetContext | null>(null);

const PetContextProvider = ({ children, data }: Props) => {
  const [pets, setPets] = useState(data);
  const [selectedPetId, setSelectPetId] = useState<string | null>(null);

  // derived state
  const selectedPet = pets.find((pet) => pet.id === selectedPetId);

  //event handlers
  const handleChangeSelectedPetId = (id: string) => {
    setSelectPetId(id);
  };

  return (
    <PetContext.Provider value={{ pets, selectedPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
