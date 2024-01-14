export class UpdateOrderDto {
  
  constructor (
    public readonly subTotal: number,
    public readonly total: number,
    public readonly userId: string,
  ) {}

  public static update(object: {[key: string]: any}): [string?, UpdateOrderDto?] {
    const {subTotal, total, userId} = object;

    if (!total) return ['Total is required', undefined];

    if (typeof total !== 'number') return ['Total must be a number', undefined];

    if (total < 0) return ['Total  must be greater than zero', undefined];

    if (!subTotal) return ['Subtotal is required', undefined];

    if (typeof subTotal !== 'number') return ['Subtotal must be a number', undefined];

    if (subTotal < 0) return ['Subtotal must be greater than zero', undefined];

    if (!userId) return ['User is required', undefined];

    return [undefined, new UpdateOrderDto(subTotal, total, userId)];
  }
}