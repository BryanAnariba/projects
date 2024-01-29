export interface Order {
  totalOrders: number;
  page:        number;
  limit:       number;
  previusPage: null;
  currentPage: string;
  nextPage:    string;
  orders:      OrderElement[];
}

export interface OrderElement {
  id:              string;
  isActive:        boolean;
  subTotal:        string;
  total:           string;
  createdAt:       Date;
  updatedAt:       Date;
  deletedAt:       null;
  productsByOrder: ProductsByOrder[];
  user:            User;
}

export interface ProductsByOrder {
  id:              string;
  quantityProduct: number;
  productValue:    string;
}

export interface User {
  id:        string;
  name:      string;
  email:     string;
  password:  string;
  isActive:  boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
}
