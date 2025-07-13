import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { KEYS } from './keys';

export interface SubCategories {
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

interface SubCategoriesResponse {
  data: SubCategories[];
  meta: Meta;
}

interface SubCategoriesProps {
  title?: string;
  categoryId?: string;
  page?: number;
  perPage?: number;
}

export function useSubCategories(subCategoryProps: SubCategoriesProps) {
  const queryFn = async () => {
    const { data } = await api.get<SubCategoriesResponse>(
      '/subcategory/search',
      {
        params: subCategoryProps,
      },
    );
    return data;
  };

  return useQuery({
    queryFn,
    queryKey: KEYS.SUBCATEGORY(
      subCategoryProps.title,
      subCategoryProps.categoryId,
    ),
  });
}
