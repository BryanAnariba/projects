export interface CategoryResponse {
  totalCategories: number;
  previusPage:     string;
  currentPage:     string;
  nextPage:        string;
  limit:           number;
  page:            number;
  categories:      Category[];
}

export interface Category {
  id:          string;
  name:        string;
  description: string;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   null;
}
