import { cnpj, cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';

export enum ProviderSession {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  IOS = 'IOS',
}

export const firstStepSignup = z
  .object({
    email: z.email({ error: 'Email inválido' }),
    password: z
      .string({ error: 'Senha obrigatória' })
      .min(6, { error: 'Senha deve ter no minímo 6 caractes' })
      .optional(),
    provider: z.nativeEnum(ProviderSession).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.provider && !data.password) {
      ctx.addIssue({
        path: ['password'],
        message: 'Senha obrigatória',
        code: z.ZodIssueCode.custom,
      });
    }
  });

const secondStepSignup = z.object({
  name: z.string({ error: 'Nome Obrigatório' }),
  phone: z.string({ error: 'Telefone obrigatório' }).refine(
    (val) => {
      const digits = val.replace(/\D/g, '');

      return digits.length === 10 || digits.length === 11;
    },
    { error: 'Número inválido' },
  ),
  isProvider: z.boolean().default(false),
  cpfCnpj: z
    .string()
    .nonempty('Campo obrigatório')
    .refine(
      (val) => {
        const cleaned = val.replace(/\D/g, '');
        return cpf.isValid(cleaned) || cnpj.isValid(cleaned);
      },
      {
        message: 'Informe um cpf/cnpj válido',
      },
    ),
  hasCNPJ: z.boolean().optional().default(false),
  photo: z.string().url().nullish(),
  accessToken: z.string().nullish(),
  providerAccountId: z.string().nullable(),
});

const thirdStepSignup = z.object({
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado deve ter 2 letras'),
  street: z.string().optional(),
  zipcode: z.string().optional(),
  number: z.string().optional(),
});

const fourStepSignup = z.object({
  code: z.array(z.string()).length(4, 'Código deve ter 6 dígitos'),
});

export const SignupConbinedSchema = firstStepSignup
  .merge(secondStepSignup)
  .merge(thirdStepSignup)
  .merge(fourStepSignup);

export type SignupValidationCombinedStep = z.infer<typeof SignupConbinedSchema>;

export const stepFields = [
  ['email', 'password'],
  ['name', 'phone', 'isProvider'],
  ['city', 'state', 'street', 'zipcode', 'number'],
  ['code'],
] as const;

export const stepFieldsWithCPFCNPJ = [
  ['email', 'password'],
  ['name', 'phone', 'isProvider', 'cpfCnpj'],
  ['city', 'state', 'street', 'zipcode', 'number'],
  ['code'],
] as const;
