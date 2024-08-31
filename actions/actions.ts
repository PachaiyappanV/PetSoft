"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addPet = async (pet) => {
  await new Promise((resolve) => setTimeout(() => resolve("data"), 3000));
  console.log(pet);
  try {
    await prisma.pet.create({
      data: pet,
    });
  } catch (err) {
    return { message: "Could not add pet" };
  }
  revalidatePath("/app", "layout");
};

export const editPet = async (petId, petData) => {
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

export const deletePet = async (petId) => {
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
