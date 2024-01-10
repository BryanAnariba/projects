import { Category } from "../../categories/interfaces/category.interface";

export interface Products {
  totalCategories: number;
  page:            number;
  limit:           number;
  previous:        string;
  current:         string;
  next:            string;
  products:      Product[];
}

export interface Product {
  id:          number;
  name:        string;
  description: string;
  isAvaliable:    boolean;
  createdAt?:   Date;
  updatedAt?:   Date;
  deletedAt?:   null;
  categoryId: number;
  category? : Category;
}
