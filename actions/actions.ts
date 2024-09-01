"use server";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export const addPet = async (pet: unknown) => {
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

export const editPet = async (petId: unknown, petData: unknown) => {
  const validatedPetData = petFormSchema.safeParse(petData);
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetData.success || !validatedPetId.success) {
    return { message: "Invalid pet data." };
  }
  try {
    await prisma.pet.update({
      where: {
        id: validatedPetId.data,
      },
      data: validatedPetData.data,
    });
  } catch (err) {
    return { message: "Could not update pet" };
  }
  revalidatePath("/app", "layout");
};

export const deletePet = async (petId: string) => {
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Invalid pet data." };
  }
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
