import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SignUpType {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface UpdateType {
  id: number;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export async function createNewUser({
  username,
  email,
  password,
  firstName,
  lastName,
}: SignUpType) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const res = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        firstName,
        lastName,
      },
    });
    return res;
  } catch (error) {
    console.log("Error Creating User", error);
    throw error;
  }
}

export async function findUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  } catch (error) {
    console.log("Error finding User", error);
    throw error;
  }
}

export async function updateUser({
  id,
  username,
  password,
  firstName,
  lastName,
}: UpdateType) {
try {
  const data: Partial<{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
  }> = {};
  if (username !== undefined) {
    data.username = username;
  }
  if (password !== undefined) {
    data.password = await bcrypt.hash(password, 10);
  }
  if (firstName !== undefined) {
    data.firstName = firstName;
  }
  if (lastName !== undefined) {
    data.lastName = lastName;
  }
  const res = await prisma.user.update({
    where: {
      id: id,
    },
    data: data,
  });
  return res
} catch (error) {
  console.log("Error Updating User", error);
  throw error;
}
}

export async function deleteUser(id: number) {
try {
  const res = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  return res;
} catch (error) {
  console.log("Error Deleting User", error);
  throw error;
}
}

