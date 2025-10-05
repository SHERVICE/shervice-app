import { cnpj, cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';
import { SigninSchema } from './signin';

const DetailsUserInfoSchema = z.object({
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
  providerAccountId: z.string().nullable(),
});

const AddressSchema = z.object({
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado deve ter 2 letras'),
  street: z.string().optional(),
  zipcode: z.string().optional(),
  number: z.string().optional(),
});

const PhoneSchema = z.object({
  code: z.array(z.string()).length(4, 'Código deve ter 6 dígitos'),
});

export const SignupConbinedSchema = SigninSchema.merge(DetailsUserInfoSchema)
  .merge(AddressSchema)
  .merge(PhoneSchema);

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
