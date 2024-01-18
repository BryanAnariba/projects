export interface ProductResponse {
  totalProducts: number;
  limit:         number;
  page:          number;
  previusPage:   string;
  currentPage:   string;
  nextPage:      string;
  products:      Product[];
}

export interface Product {
  id:          string;
  name:        string;
  description: string;
  price:       string;
  stock:       number;
  isActive:    boolean;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   null;
  image:       string;
  category:    Category;
}

export interface Category {
  id:          string;
  name:        string;
  description: string;
  createdAt:   Date;
  updatedAt:   Date;
  deletedAt:   null;
}
