import { AppDataSource } from "../../config/data-source";
import { Product } from "../../config/entity";
import { CustomError } from "../../domain";
import { CreateProductDto, UpdateProductDto } from "../../domain/dtos";
import { CategoryService } from "./categories.service";

export class ProductService {

  constructor() {}

  public async getProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find({
      where: {
        deletedAt: null,
      },
      relations: {
        category: true,
      }
    });
    return products;
  }

  public async getProduct(productId: number) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({
      where: {
        id: productId
      },
      relations: {
        category: true,
      }
    });
    return product;
  }

  public async createProduct(createProductDto: CreateProductDto) {
    const categoryService = new CategoryService();
    const category = await categoryService.getCategory(createProductDto.categoryId);
    if (!category) throw CustomError.badRequest('Category not found');

    const productRepository = AppDataSource.getRepository(Product);
    const newProduct = await productRepository.save({...createProductDto, category: category});
    return newProduct;
  }

  public async upadateProduct(updateProductDto: UpdateProductDto, productId: number) {
    const categoryService = new CategoryService();
    const productRepository = AppDataSource.getRepository(Product);

    const product = await this.getProduct(productId);
    if (!product) throw CustomError.badRequest('Product Not Found');

    const category = await categoryService.getCategory(updateProductDto.categoryId);
    if (!category) throw CustomError.badRequest('Category not found');

    const update = await productRepository.save({
      ...product,
      ...updateProductDto,
      category: category,
    });
    
    return update;
  }

  public async deleteProduct(productId: number) {
    const productRepository = AppDataSource.getRepository(Product);

    const product = await this.getProduct(productId);
    if (!product) throw CustomError.badRequest('Product Not Found');

    const deleted = await productRepository.save({
      ...product,
      deletedAt: new Date(),
    });

    return deleted;
  }

}