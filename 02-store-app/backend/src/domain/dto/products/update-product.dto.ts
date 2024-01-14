export class UpdateProductDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string
  ) {}

  public static update(object: {[key: string]: any}): [string?, UpdateProductDto?] {
    const {name, description, price, stock, categoryId} = object;

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (price) {
      if (typeof price !== 'number') return ['Price must be a number', undefined];
      if (price < 0) return ['Price must be greater than zero'];
    }    

    if (stock) {
      if (typeof stock !== 'number') return ['Stock must be a number', undefined];
      if (stock < 0) return ['Stock must be greater than zero', undefined];
    }

    if (!categoryId) {
      return ['Category is required', undefined];
    }

    return [undefined, new UpdateProductDto(name, description, price, stock, categoryId)];
  }
}