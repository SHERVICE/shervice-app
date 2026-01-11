import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';
import { UserResponse } from '../session/useSignin';

interface User {
  code: string;
  userId: string;
}

export function useEnableAccount() {
  const mutationFn = async (enableAccountData: User) => {
    const { data } = await api.post<UserResponse>(
      '/session/code-check',
      enableAccountData,
    );

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
