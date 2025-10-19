import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface User {
  code: string;
  userId: string;
}

interface AccountResponse {
  accessToken: string;
  refreshToken: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string | null;
}

export function useEnableAccount() {
  const mutationFn = async (enableAccountData: User) => {
    const { data } = await api.post<AccountResponse>(
      '/session/code-check',
      enableAccountData,
    );

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
