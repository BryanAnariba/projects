import { CustomError } from "../errors";

interface CategoryEntityOptions {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class CategoryEntity {

  public readonly id: string;
  public readonly name: string;
  public readonly description: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  constructor ({id,name,description,createdAt,updatedAt,deletedAt}: CategoryEntityOptions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static getObjectFromJson(json: {[key: string]: any}): CategoryEntity {
    const {id,name,description,createdAt,updatedAt,deletedAt} = json;

    if (!id) throw CustomError.badRequest('Category Id is required');

    if (!name) throw CustomError.badRequest('Category Name is required');

    if (!description) throw CustomError.badRequest('Category description is required');

    return new CategoryEntity({id,name,description,createdAt,updatedAt,deletedAt});
  }
}