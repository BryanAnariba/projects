export class CreateCategoryDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
    public readonly isActive: boolean
  ) {}

  public static create(object: {[key: string]: any}): [string?, CreateCategoryDto?] {
    const {name, description, isActive} = object;

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    if (isActive && typeof isActive !== 'boolean') {
      return ['Is active must be a boolean', undefined];
    }

    return [undefined, new CreateCategoryDto(name, description, isActive)];
  }
  
}