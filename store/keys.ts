export const KEYS = {
  CATEGORY: ['CATEGORY'],
  SUBCATEGORY: (title?: string, categoryId?: string, perPage?: number) => [
    'SUBCATEGORY',
    title,
    categoryId,
  ],
};
