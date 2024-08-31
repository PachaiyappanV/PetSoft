"use server";
import prisma from "@/lib/db";
import { PetEssentials } from "@/lib/types";
import { petFormSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const addPet = async (pet: PetEssentials) => {
  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: "Invalid pet data." };
  }
  console.log(validatedPet);
  try {
    await prisma.pet.create({
      data: validatedPet.data,
    });
  } catch (err) {
    return { message: "Could not add pet" };
  }
  revalidatePath("/app", "layout");
};

export const editPet = async (petId: string, petData: PetEssentials) => {
  try {
    await prisma.pet.update({
      where: {
        id: petId,
      },
      data: petData,
    });
  } catch (err) {
    return { message: "Could not update pet" };
  }
  revalidatePath("/app", "layout");
};

export const deletePet = async (petId: string) => {
  try {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    });
  } catch (err) {
    return { message: "Could not delete pet" };
  }
  revalidatePath("/app", "layout");
};
