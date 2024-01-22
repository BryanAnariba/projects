export interface CartItemList {
  userId:   string;
  products: CartProduct[];
}

export interface CartProduct {
  productId:       string;
  quantityProduct: number;
  productValue:    number;
}

export interface ProductItemCart {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  total: number;
}