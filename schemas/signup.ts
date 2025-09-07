import { cnpj, cpf } from 'cpf-cnpj-validator';
import { z } from 'zod';

const firstStepSignup = z.object({
  email: z.email({ error: 'Email inválido' }),
  name: z.string({ error: 'Nome Obrigatório' }),
  password: z
    .string({ error: 'Senha obrigatória' })
    .min(6, { error: 'Senha deve ter no minímo 6 caractes' }),
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
});

const secondStepSignup = z.object({
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().min(2, 'Estado deve ter 2 letras'),
  street: z.string().optional(),
  zipcode: z.string().optional(),
  number: z.string().optional(),
});

const thirdStepSignup = z.object({
  code: z.array(z.string()).length(4, 'Código deve ter 6 dígitos'),
});

export const SignupConbinedSchema = firstStepSignup
  .merge(secondStepSignup)
  .merge(thirdStepSignup);

export type SignupValidationCombinedStep = z.infer<typeof SignupConbinedSchema>;

export const stepFields = [
  ['name', 'phone', 'isProvider'],
  ['city', 'state', 'street', 'zipcode', 'number'],
  ['code'],
] as const;

export const stepFieldsWithCPFCNPJ = [
  ['name', 'phone', 'isProvider', 'cpfCnpj'],
  ['city', 'state', 'street', 'zipcode', 'number'],
  ['code'],
] as const;
