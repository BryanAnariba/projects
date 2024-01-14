export class UpdateCategoryDto {

  constructor (public readonly name: string, public readonly description: string) {}

  public static update(object: {[key: string]: any}): [string?, UpdateCategoryDto?] {
    const {name, description} = object;
    if(!name || name.trim().length === 0) return ['Name should not be empty', undefined];

    if (!description || description.trim().length === 0) return ['Description should not be empty', undefined];

    return [undefined, new UpdateCategoryDto(name, description)];
  }
} 