export interface Order {
  userId:   string;
  products: Product[];
}

export interface Product {
  productId: string;
  quantity:  number;
  price:     number;
  stock:     number;
}

export class CreateOrderDto {
  public readonly userId: string;
  public readonly products: Product[];
  constructor({userId, products}: Order) {
    this.userId = userId;
    this.products = products;
  }

  public static create(object: Order): [string?, CreateOrderDto?] {
    const {userId, products} = object;

    if (!userId) return ['User is required'];

    if (!products || products.length === 0) return ['The order needs at least one product in the shopping cart', undefined];

    return [undefined, new CreateOrderDto({userId, products})];
  }
}