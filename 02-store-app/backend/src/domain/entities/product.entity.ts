import { CustomError } from '../errors';
import { CategoryEntity } from './category.entity';

interface ProductEntityOptions {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  category: CategoryEntity;
  image?: Buffer;
}

export class ProductEntity {
  public readonly id: number;
  public readonly name: string;
  public readonly description: string;
  public readonly price: number;
  public readonly stock: number;
  public readonly isActive: boolean;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;
  public readonly category: CategoryEntity;
  public readonly image?: Buffer;

  constructor ({id, name, description, price, stock, isActive, createdAt, updatedAt, deletedAt, category, image}: ProductEntityOptions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.stock = stock;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.category = category;
    this.image = image;
    CategoryEntity.getObjectFromJson(this.category);
  }

  public static getObjectFromJson (json: {[key: string]: any}): ProductEntity {
    const {id, name, description, price, stock, isActive, createdAt, updatedAt, deletedAt, category, image} = json;
    
    if (!id) throw CustomError.badRequest('Id is required');

    if (!name) throw CustomError.badRequest('Product Name is required');

    if (!description) throw CustomError.badRequest('Product Description is required');

    if (!price) throw CustomError.badRequest('Price is required');

    if (!stock) throw CustomError.badRequest('Stock is required');

    return new ProductEntity({id, name, description, price, stock, isActive, createdAt, updatedAt, deletedAt, category, image});
  }
}