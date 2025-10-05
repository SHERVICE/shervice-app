export function maskPhoneCustom(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return phone;

  const ddd = digits.slice(0, 2);
  const number = digits.slice(2);
  const first2 = number.slice(0, 2);
  const last2 = number.slice(-2);
  const middle = number.slice(2, -2).replace(/\d/g, '*');

  return `(${ddd}) ${first2}${middle}${last2}`;
}
