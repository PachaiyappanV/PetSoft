"use server";
import { signIn, signOut } from "@/lib/auth";
import prisma from "@/lib/db";
import { checkAuth } from "@/lib/server-utils";
import { authSchema, petFormSchema, petIdSchema } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

//---- user actions ---

export const logIn = async (prevState: unknown, formData: unknown) => {
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }
  const authData = Object.fromEntries(formData.entries());

  try {
    await signIn("credentials", { ...authData, redirectTo: "/app/dashboard" });
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin": {
          return {
            message: "Invalid credentials.",
          };
        }
        default: {
          return {
            message: "Error. Could not sign in.",
          };
        }
      }
    }

    throw err; // nextjs redirects throws error, so we need to rethrow it
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/" });
};

export const signUp = async (prevState: unknown, formData: unknown) => {
  // check if formData is a FormData type
  if (!(formData instanceof FormData)) {
    return {
      message: "Invalid form data.",
    };
  }

  // convert formData to a plain object
  const authData = Object.fromEntries(formData.entries());

  // validation
  const validatedFormData = authSchema.safeParse(authData);
  if (!validatedFormData.success) {
    return {
      message: "Invalid form data.",
    };
  }

  const { email, password } = validatedFormData.data;

  const hashedPassword = await bcrypt.hash(password as string, 10);
  try {
    await prisma.user.create({
      data: {
        email: email as string,
        password: hashedPassword,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        return { message: "Email already exists" };
      }
    }
    return {
      message: "Could not create user.",
    };
  }
  await signIn("credentials", { ...authData, redirectTo: "/app/dashboard" });
};

//---- pet actions ----

export const addPet = async (pet: unknown) => {
  const session = await checkAuth();

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
  //authentication
  const session = await checkAuth();

  //validation
  const validatedPetData = petFormSchema.safeParse(petData);
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetData.success || !validatedPetId.success) {
    return { message: "Invalid pet data." };
  }

  //authorization
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });
  if (!pet) {
    return { message: "Pet not found." };
  }
  if (pet.userId !== session.user.id) {
    return { message: "Not authorized" };
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
  //authentication
  const session = await checkAuth();

  //validation
  const validatedPetId = petIdSchema.safeParse(petId);
  if (!validatedPetId.success) {
    return { message: "Invalid pet data." };
  }

  //authorization
  const pet = await prisma.pet.findUnique({
    where: {
      id: validatedPetId.data,
    },
  });
  if (!pet) {
    return { message: "Pet not found." };
  }
  if (pet.userId !== session.user.id) {
    return { message: "Not authorized" };
  }

  try {
    await prisma.pet.delete({
      where: {
        id: validatedPetId.data,
      },
    });
  } catch (err) {
    return { message: "Could not delete pet" };
  }
  revalidatePath("/app", "layout");
};
