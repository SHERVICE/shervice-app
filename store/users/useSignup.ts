import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface Address {
  city: string;
  street: string;
  neighborhood?: string;
  zipcode: string;
  latitude?: number;
  longitude?: number;
}

interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  serviceProvider: boolean;
  cpfCnpj: string;
  address: Address;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

export function useSignupMutation() {
  const mutationFn = async (userData: User) => {
    const { data } = await api.post<UserResponse>('/session/signup', userData);

    return data;
  };

  return useMutation({
    mutationFn,
  });
}
