export class UpdateCategoryDto {

  constructor (
    public readonly name: string,
    public readonly description: string,
  ) {}

  public static update(object: {[key: string]: any}): [string?, UpdateCategoryDto?] {
    const {name, description} = object;

    if (!name || name.trim().length === 0) {
      return ['Name is required', undefined];
    }

    if (!description || description.trim().length === 0) {
      return ['Description is required', undefined];
    }

    return [undefined, new UpdateCategoryDto(name, description)];
  }
  
}