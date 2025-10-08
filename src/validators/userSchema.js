import * as z from 'zod';

export const userSignUpSchema = z.object({
  fullname: z.string().min(1, 'Full name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be atleast of size 6')
});
export const userSignInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});
