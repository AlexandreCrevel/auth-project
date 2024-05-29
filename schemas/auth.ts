import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({
    message: 'Must be a valid email',
  }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

export const signUpSchema = signInSchema.merge(
  z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  })
);

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;
