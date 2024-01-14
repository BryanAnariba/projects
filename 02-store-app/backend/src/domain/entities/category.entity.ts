interface CategoryEntityOptions {
  id: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class CategoryEntity {

  private readonly id: string;
  private readonly name: string;
  private readonly description: string;
  private readonly createdAt?: Date;
  private readonly updatedAt?: Date;
  private readonly deletedAt?: Date;

  constructor ({id,name,description,createdAt,updatedAt,deletedAt}: CategoryEntityOptions) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public static getObjectFromJson(object: {[key: string]: any}): CategoryEntity {
    const {id,name,description,createdAt,updatedAt,deletedAt} = object;

    return new CategoryEntity({id,name,description,createdAt,updatedAt,deletedAt});
  }
}