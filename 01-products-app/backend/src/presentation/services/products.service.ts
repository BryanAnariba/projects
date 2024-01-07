import { AppDataSource } from "../../config/data-source";
import { Product } from "../../config/entity";
import { CustomError } from "../../domain";
import { CreateProductDto, PaginationDto, UpdateProductDto } from "../../domain/dtos";
import { CategoryService } from "./categories.service";

export class ProductService {

  constructor() {}

  public async getProducts(paginationDto: PaginationDto) {
    const productRepository = AppDataSource.getRepository(Product);

    const [products, totalProducts] = await Promise.all(
      [
        productRepository.find({
          where: {
            deletedAt: null,
          },
          relations: {
            category: true,
          },
          skip: (paginationDto.page - 1) * paginationDto.limit,
          take: paginationDto.limit,
        }),
        productRepository.countBy({
          deletedAt: null,
        }),
      ]
    );

    return {
      page: paginationDto.page,
      limit: paginationDto.limit,
      previous: (paginationDto.page - 1 > 0 ? `/api/products?page=${paginationDto.page - 1}&limit=${ paginationDto.limit }` : null),
      current: `/api/products?page${paginationDto.page}&limit=${paginationDto.limit}`,
      next: `/api/products?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      totalProducts: totalProducts,
      products: products,
    };
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