import { AppDataSource } from "../../config";
import { Category, Product } from "../../config/entity";
import { CreateProductDto, PaginationDto, UpdateProductDto } from "../../domain/dto";
import { ProductEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import fs from 'node:fs';

export class ProductService {

  constructor() {}

  public async getProductByName (name: string) {
    const productRepository = AppDataSource.getRepository(Product);
    return await productRepository.findOneBy({name: name});
  }

  public async createProduct (createProductDto: CreateProductDto) {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    const product = await productRepository.findOne({where: {name: createProductDto.name}});
    const category = await categoryRepository.findOne({where: {id: createProductDto.categoryId}});

    if (!category) throw CustomError.badRequest('Category Not Found');
    if (product) throw CustomError.badRequest('Product Already Exists!');

    const productSaved = await productRepository.save({
      name: createProductDto.name,
      description: createProductDto.description,
      category: category,
      price: Number(createProductDto.price),
      stock: Number(createProductDto.stock),
      image: `uploads/${createProductDto.image}`,
    });

    return productSaved;
  }

  public async getProducts (paginationDto: PaginationDto) {
    const productRepository = await AppDataSource.getRepository(Product);
    const [totalProducts, products] = await Promise.all([
      productRepository.countBy({
        deletedAt: null
      }),
      productRepository.find({
        where: {
          deletedAt: null,
        }, 
        relations: {
          category: true
        },
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      }),
    ]);

    return {
      totalProducts,
      limit: paginationDto.limit,
      page: paginationDto.page,
      previusPage: (paginationDto.page - 1) > 0 ? `/api/v1/products?page=${paginationDto.page-1}&limit=${paginationDto.limit}` : null,
      currentPage: `/api/v1/products?page=${paginationDto.page}&limit=${paginationDto.limit}`,
      nextPage: `/api/v1/products?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      products,
    }
  }

  public async getProduct (productId): Promise<ProductEntity> {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({where: {id: productId}, relations: {category: true}});
    if (!product) throw CustomError.notFoundRequest('Product not found');
    return ProductEntity.getObjectFromJson(product);
  }

  public async updateOne (updateProductDto: UpdateProductDto, productId: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    const product = await productRepository.findOne({where: {id: productId, deletedAt: null}, relations: {category: true}});
    const category = await categoryRepository.findOne({where: {id: updateProductDto.categoryId, deletedAt: null}});

    if (!product) throw CustomError.badRequest('Product not found');
    if (!category) throw CustomError.badRequest('Category not found');

    if (
      updateProductDto.image &&
      product.image &&
      (product.image !== updateProductDto.image) && 
      fs.existsSync(`${__dirname}../../../../${product.image}`)
    ) {
      fs.unlinkSync(`${__dirname}../../../../${product.image}`);
    }
    const updated = productRepository.save({
      ...product,
      name: updateProductDto.name,
      description: updateProductDto.description,
      category: category,
      price: Number(updateProductDto.price),
      stock: Number(updateProductDto.stock),
      image: `${updateProductDto.image}`,
    });

    return updated;
  }

  public async deleteOne (productId: string) {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOne({where: {id: productId, deletedAt: null}, relations: {category: true}});
    if (!product) throw CustomError.badRequest('Product not found');

    const deleted = await productRepository.save({...product, deletedAt: new Date()});

    return deleted;
  }
}