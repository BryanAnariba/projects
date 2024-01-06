export class UpdateProductDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
    public readonly isAvaliable: boolean,
  ) {}

  public static update(object: {[key: string]: any}): [string?, UpdateProductDto?] {
    const {name, description, isAvaliable} = object;

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (isAvaliable && typeof isAvaliable !== 'boolean') {
      return ['Avaiable must be a bool', undefined];
    }

    return [undefined, new UpdateProductDto(name, description, isAvaliable)];
  }
  
}