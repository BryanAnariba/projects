export interface Categories {
  totalCategories: number;
  page:            number;
  limit:           number;
  previous:        string;
  current:         string;
  next:            string;
  categories:      Category[];
}

export interface Category {
  id:          number;
  name:        string;
  description: string;
  isActive:    boolean;
  createdAt?:   Date;
  updatedAt?:   Date;
  deletedAt?:   null;
}
