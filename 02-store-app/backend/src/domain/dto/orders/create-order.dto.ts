export class CreateOrderDto {
  
  constructor(
    public readonly subTotal: number,
    public readonly total: number,
    public readonly userId: string
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateOrderDto?] {
    const {subTotal, total, userId} = object;

    if (!userId) return ['User is required'];

    if (!subTotal) return ['Subtotal is required', undefined];

    if (typeof subTotal !== 'number') return ['Sub total must be a number', undefined];

    if (subTotal < 0) return ['Subtotal must be greather than zero'];

    if (!total) return ['Total is required', undefined];

    if (typeof total !== 'number') return ['Total must be a number', undefined];

    if (total < 0) return ['Total must be greater than zero', undefined];

    return [undefined, new CreateOrderDto(subTotal, total, userId)];
  }
}