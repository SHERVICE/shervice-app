import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface PhoneNumberCheckResponse {
  exists: boolean;
}

interface PhoneNumberCheckParams {
  phone: string;
}

export function usePhoneNumberCheck() {
  const mutationFn = async (numberCheckParams: PhoneNumberCheckParams) => {
    const { data } = await api.post<PhoneNumberCheckResponse>(
      '/session/number-exists',
      numberCheckParams,
    );
    return data;
  };

  return useMutation({
    mutationFn,
  });
}
