import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface RefreshCodeParams {
  userId: string;
}

interface FindUserByEmailResponse {
  exists: boolean;
  phoneVerification: boolean;
}

export function useRefreshCode() {
  const mutationFn = async (refreshCodeParams: RefreshCodeParams) => {
    const { data } = await api.post<FindUserByEmailResponse>(
      '/session/refresh-code',
      refreshCodeParams,
    );

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
