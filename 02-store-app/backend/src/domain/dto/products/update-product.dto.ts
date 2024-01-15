export class UpdateProductDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly categoryId: string,
    public readonly image?: string,
  ) {}

  public static update(object: {[key: string]: any}): [string?, UpdateProductDto?] {
    const {name, description, price, stock, categoryId, image} = object;

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (price) {
      if (typeof Number(price) !== 'number') return ['Price must be a number', undefined];
      if (price < 0) return ['Price must be greater than zero'];
    }    

    if (stock) {
      if (typeof Number(stock) !== 'number') return ['Stock must be a number', undefined];
      if (stock < 0) return ['Stock must be greater than zero', undefined];
    }

    if (!categoryId) {
      return ['Category is required', undefined];
    }

    if (image && typeof image !== 'string') {
      return ['Images must be a string', undefined];
    }
    return [undefined, new UpdateProductDto(name, description, price, stock, categoryId, image)];
  }
}