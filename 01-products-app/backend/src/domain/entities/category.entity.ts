import { CustomError } from "../errors/custom.error";

export interface CategoryEntityOptions {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  products?: []
}

export class CategoryEntity {
  
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly isActive: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
  public readonly products: [];

  constructor ({id, name, description, isActive, createdAt, updatedAt, deletedAt, products}: CategoryEntityOptions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.products = products;
  }

  public static setJsonFromObject(object: {[key: string]: any}): CategoryEntity {

    const {id, name, description, isActive, createdAt, updatedAt, deletedAt, products} = object;
    if (!id) {
      throw CustomError.badRequest('Id is required');
    }

    if (!name) {
      throw CustomError.badRequest('Name is required');
    }

    if (!description) {
      throw CustomError.badRequest('Description is required');
    }

    return new CategoryEntity({id, name, description, isActive, createdAt, updatedAt, deletedAt, products});
  }
}