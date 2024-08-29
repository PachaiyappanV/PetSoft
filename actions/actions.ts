"use server";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export const addPet = async (formData) => {
  console.log(formData);
  await prisma.pet.create({
    data: {
      name: formData.get("name"),
      ownerName: formData.get("ownerName"),
      age: Number(formData.get("age")),
      imageUrl:
        formData.get("imageUrl") ||
        "https://bytegrad.com/course-assets/react-nextjs/pet-placeholder.png",
      notes: formData.get("notes"),
    },
  });
  revalidatePath("/app", "layout");
};
