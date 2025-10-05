import { z } from 'zod';

export enum ProviderSession {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  IOS = 'IOS',
}

export const SigninSchema = z
  .object({
    email: z.email({ error: 'Email inválido' }),
    password: z
      .string({ error: 'Senha obrigatória' })
      .min(6, { error: 'Senha deve ter no minímo 6 caractes' })
      .nullable(),
    provider: z.nativeEnum(ProviderSession).optional(),
    token: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    if (!data.provider && (!data.password || data.password === '')) {
      ctx.addIssue({
        path: ['password'],
        message: 'Senha obrigatória',
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type SigninType = z.infer<typeof SigninSchema>;
