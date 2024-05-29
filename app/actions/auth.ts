'use server';

import { SignUpSchemaType } from '@/schemas/auth';
import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

export const signUpNewUser = async (data: SignUpSchemaType) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    });

    console.log('New user created:', user);
    return { user };
  } catch (error) {
    console.error('Error creating new user:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (
        error.code === 'P2002' &&
        Array.isArray(error.meta?.target) &&
        error.meta.target.includes('email')
      ) {
        return { error: 'Email already registered' };
      }
    }

    return { error: 'Unable to create user' };
  }
};

export const signInUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: 'User not found' };
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return { error: 'Incorrect password' };
  }

  return { user };
};
