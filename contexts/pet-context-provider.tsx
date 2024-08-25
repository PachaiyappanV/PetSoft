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
  const [selectedPetId, setSelectPetId] = useState(null);
  return (
    <PetContext.Provider value={{ pets, selectedPetId }}>
      {children}
    </PetContext.Provider>
  );
};

export default PetContextProvider;
