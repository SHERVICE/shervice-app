import { z } from 'zod';

export const SigninSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z
    .string()
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

export type SigninType = z.infer<typeof SigninSchema>;
