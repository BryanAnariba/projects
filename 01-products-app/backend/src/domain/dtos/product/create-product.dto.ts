export class CreateProductDto {
  
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly isAvaliable: boolean
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateProductDto?] {
    const {name, description, isAvaliable} = object;

    if(!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (isAvaliable && typeof isAvaliable !== 'boolean') {
      return ['Avaliable must be a bool', undefined];
    }

    return [undefined, new CreateProductDto(name, description, isAvaliable)];
  }
  
}