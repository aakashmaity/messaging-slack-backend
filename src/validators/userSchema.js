import * as z from 'zod';

export const userSignUpSchema = z.object({
  fullname: z.string().min(1, 'Full name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.email('Invalid email address'),
  password: z.string()
});
