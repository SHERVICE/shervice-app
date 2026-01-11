import { ProviderSession } from '@/schemas/signin';
import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

export interface UserSigninParams {
  email: string;
  password: string | null;
  token?: string | null;
  provider?: ProviderSession;
}

type Customer = {
  id: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
};

type Provider = {
  id: string;
  userId: string;
  cpfCnpj: string | null;
  created_at: Date;
  updated_at: Date;
};

export interface UserResponse {
  name: string;
  phoneVerification: boolean;
  phone: string;
  id: string;
  photo: string | null;
  customer: Customer | null;
  providerProfile: Provider | null;
  accessToken: string;
  refreshToken: string;
}

export function useSigninMutation() {
  const mutationFn = async (userData: UserSigninParams) => {
    const { data } = await api.post<UserResponse>('/session/signin', userData);

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
