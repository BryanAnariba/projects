import { CustomError } from "../errors/custom.error";

export interface ProductEntityOptions {
  id: number;
  name: string;
  description: string;
  isAvaliable: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  category: number;
}

export class ProductEntity {

  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly isAvaliable: boolean;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;
  public readonly category: number;

  constructor({id, name, description, isAvaliable, createdAt, updatedAt, deletedAt, category}: ProductEntityOptions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.isAvaliable = isAvaliable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.category = category;
  }

  public static setJsonFromObject(object: {[key: string]: any}): ProductEntity {
    const {id, name, description, isAvaliable, createdAt, updatedAt, deletedAt, category} = object;
    if (!id) {
      throw CustomError.badRequest('Id is required');
    }

    if (!name) {
      throw CustomError.badRequest('Name is required');
    }

    if (!description) {
      throw CustomError.badRequest('Description is required');
    }

    return new ProductEntity({id, name, description, isAvaliable, createdAt, updatedAt, deletedAt, category});
  }
}