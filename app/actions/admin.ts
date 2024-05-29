'use server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  const usersWithStringId = users.map((user) => ({
    ...user,
    id: user.id.toString(),
  }));

  return usersWithStringId;
};

export const changeUserRole = async (id: string, role: string) => {
  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
