export const KEYS = {
  CATEGORY: ['CATEGORY'],
  SUBCATEGORY: (title?: string, categoryId?: string) => [
    'SUBCATEGORY',
    title,
    categoryId,
  ],
};
