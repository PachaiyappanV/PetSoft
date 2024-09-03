import { z } from "zod";

export const petFormSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }).max(100),
  ownerName: z
    .string()
    .trim()
    .min(1, { message: "Owner name is required" })
    .max(100),
  imageUrl: z.union([
    z.literal(""),
    z.string().trim().url({ message: "Image url must be a valid url" }),
  ]),
  age: z.coerce.number().int().positive().max(100),
  notes: z.union([z.literal(""), z.string().trim().max(1000)]),
});

export const petIdSchema = z.string().cuid();

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
