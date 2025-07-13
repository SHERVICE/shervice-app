import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { KEYS } from './keys';

export interface Categories {
  id: string;
  title: string;
  figure: string;
  quantityProvider: number;
  created_at: string;
  updated_at: string;
}

interface Meta {
  total: number;
  perPage: number;
  page: number;
  next: null | boolean;
  prev: null | boolean;
}

interface CategoriesResponse {
  data: Categories[];
  meta: Meta;
}

interface CategoriesProps {
  title?: string;
  categoryId?: string;
  page?: number;
  perPage?: number;
}

export function useCategories(categoryProps: CategoriesProps) {
  const queryFn = async () => {
    const { data } = await api.get<CategoriesResponse>('/category/search', {
      params: categoryProps,
    });
    return data;
  };

  return useQuery({
    queryFn,
    queryKey: KEYS.SUBCATEGORY(
      categoryProps.title,
      categoryProps.categoryId,
      categoryProps.perPage,
    ),
    staleTime: 0,
  });
}
