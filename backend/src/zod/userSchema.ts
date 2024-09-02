import * as z from "zod";

export const signUpValidation = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstName: z.string().min(1, "FirstName is required"),
  lastName: z.string().min(1, "lastName is Required"),
});

export const signInValidation = z.object({
  email: z.string().email("Invalid email Format"),
  password: z.string().min(6, "Invalid Password"),
});

export const updateUserValidation = z.object({
  username: z.string().optional(),
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});
