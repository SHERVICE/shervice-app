import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface User {
  code: string;
  userId: string;
}

interface AccountEnableResponse {
  accessToken: string;
  refreshToken: string;
}

export function useEnableAccount() {
  const mutationFn = async (enableAccountData: User) => {
    const { data } = await api.post<AccountEnableResponse>(
      '/session/code-check',
      enableAccountData,
    );

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
