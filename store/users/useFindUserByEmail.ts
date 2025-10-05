import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface FindUserByEmail {
  email: string;
}

interface FindUserByEmailResponse {
  exists: boolean;
  phoneVerification: boolean;
  isSocial: boolean;
}

export function useFindUserByEmail() {
  const mutationFn = async (findUserByEmailData: FindUserByEmail) => {
    const { data } = await api.post<FindUserByEmailResponse>(
      '/client/findByEmail',
      findUserByEmailData,
    );

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
