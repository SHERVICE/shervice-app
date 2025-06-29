import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { KEYS } from './keys';

interface Category {
  id: string;
  title: string;
  figure: string;
  created_at: string;
  updated_at: string;
}

export function useCategories() {
  const queryFn = async () => {
    const { data } = await api.get<Category[]>('/category');
    return data;
  };

  return useQuery({
    queryFn,
    queryKey: KEYS.CATEGORY,
  });
}
