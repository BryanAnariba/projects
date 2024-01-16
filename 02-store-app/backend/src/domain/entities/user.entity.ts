import { CustomError } from "../errors";

interface UserEntityOptions {
 id: string;
 name: string;
 email: string;
 password: string;
 isActive: string;
 createdAt?: Date;
 updatedAt?: Date;
 deletedAt?: Date;
}

export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;
  public readonly password: string;
  public readonly isActive: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly deletedAt?: Date;

  constructor ({id, name, email, password, isActive, createdAt, updatedAt, deletedAt}: UserEntityOptions) {
    this.id = id ;
    this.name = name ;
    this.email = email ;
    this.password = password ;
    this.isActive = isActive ;
    this.createdAt = createdAt ;
    this.updatedAt = updatedAt ;
    this.deletedAt = deletedAt ;
  }

  public static getObjectFromJson(json: {[key: string]: any}): UserEntity {
    const {id, name, email, password, isActive, createdAt, updatedAt, deletedAt} = json;

    if (!id) throw new Error('Id is required');

    if (!name) throw new Error('Name is required');

    if (!email) throw new Error('Email is required');

    //if (password) throw CustomError.badRequest('Password is required');

    return new UserEntity({id, name, email, password, isActive, createdAt, updatedAt, deletedAt});
  }
}