export class CreateProductDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string,
    public readonly image: string,
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
    const {name, description, price, stock, categoryId, image} = object;

    if (!categoryId || categoryId.trim().length === 0) {
      return ['Category is required', undefined];
    }

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (!price && (typeof price !== 'number' || typeof price !== 'bigint')) {
      return ['Price is required and must be a number', undefined];
    }

    if(price < 0) {
      return ['Price must be greater than zero', undefined];
    }

    if (!stock && (typeof stock !== 'number' || typeof stock !== 'bigint')) {
      return ['Stock is required and must be a number', undefined];
    }

    if(stock < 0) {
      return ['Stock must be greater than zero', undefined];
    }

    if (!image) {
      return ['Images is required', undefined];
    }

    return [undefined, new CreateProductDto(name, description, price, stock, categoryId, image)];
  }
}