"use server";
import { auth, signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { petFormSchema, petIdSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//---- user actions ---

export const logIn = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());

  await signIn("credentials", { ...authData, redirectTo: "/app/dashboard" });
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (formData: FormData) => {
  const authData = Object.fromEntries(formData.entries());

  const hashedPassword = await bcrypt.hash(authData.password as string, 10);

  await prisma.user.create({
    data: {
      email: authData.email as string,
      password: hashedPassword,
    },
  });

  await signIn("credentials", { ...authData, redirectTo: "/app/dashboard" });
};

//---- pet actions ----

export const addPet = async (pet: unknown) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const validatedPet = petFormSchema.safeParse(pet);
  if (!validatedPet.success) {
    return { message: "Invalid pet data." };
  }

  try {
    await prisma.pet.create({
      data: {
        ...validatedPet.data,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
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
