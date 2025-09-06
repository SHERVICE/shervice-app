/**
 * Remove caracteres especiais de CPF, CNPJ, telefone, etc.
 * @param input string com números e caracteres especiais
 * @returns string apenas com números
 */
export function cleanNumber(input: string): string {
  return input.replace(/\D/g, '');
}
