import { AppDataSource } from "../../config";
import { Category } from "../../config/entity";
import { CategoryEntity } from "../../domain/entities";
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";
import { Like } from "typeorm";

export class CategoryService {

  constructor() { }

  public async createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryRespository = AppDataSource.getRepository(Category);
    const category = await categoryRespository.findBy({ name: createCategoryDto.name });
    if (category) throw new Error('Category Already Exists');
    const saved = await categoryRespository.save(createCategoryDto);
    return CategoryEntity.getObjectFromJson(saved);
  }

  public async getCategories(paginationDto: PaginationDto) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const [totalCategories, categories] = await Promise.all([
      categoryRepository.count({ where: { deletedAt: null } }),
      categoryRepository.find({
        where: {
          deletedAt: null,
        },
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      })
    ]);

    return {
      totalCategories,
      previusPage: (paginationDto.page - 1 > 0) ? `/api/v1/categories?page=${paginationDto.page - 1}&limit=${paginationDto.limit}` : null,
      currentPage: `/api/v1/categories?page=${paginationDto.page}&limit=${paginationDto.limit}`,
      nextPage: `/api/v1/categories?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      limit: paginationDto.limit,
      page: paginationDto.page,
      categories: categories,
    };
  }

  public async getCategoriesByName(paginationDto: PaginationDto, name: string = '') {
    const categoryRepository = AppDataSource.getRepository(Category);
    const [totalCategories, categories] = await Promise.all([
      categoryRepository.countBy({ deletedAt: null, name: Like('%' + name + '%') }),
      categoryRepository.find({
        where: [
          { name: Like('%'+name+'%'), deletedAt: null },
        ],
        skip: ((paginationDto.page - 1) * paginationDto.limit),
        take: paginationDto.limit,
      }),
    ]);
    return {
      totalCategories,
      previusPage: (paginationDto.page - 1 > 0) ? `/api/v1/categories/?page=${paginationDto.page - 1}&limit=${paginationDto.limit}&name=${name}` : null,
      currentPage: `/api/v1/categories/?page=${paginationDto.page}&limit=${paginationDto.limit}&name=${name}`,
      nextPage: `/api/v1/categories/?page=${paginationDto.page + 1}&limit=${paginationDto.limit}&name=${name}`,
      limit: paginationDto.limit,
      page: paginationDto.page,
      categories,
    };
  }

  public async getCategory(categoryId: string): Promise<CategoryEntity> {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOneBy({ id: categoryId });
    if (!category) throw CustomError.notFoundRequest('Category Not Found');
    return CategoryEntity.getObjectFromJson(category);
  }

  public async updateCategory(updateCategoryDto: UpdateCategoryDto, categoryId: string): Promise<CategoryEntity> {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findBy({ id: categoryId });
    if (!category) throw CustomError.notFoundRequest('Category Not Found');
    const updated = await categoryRepository.save({
      ...category,
      id: categoryId,
      ...updateCategoryDto
    });

    return CategoryEntity.getObjectFromJson(updated);
  }

  public async deleteCategory(categoryId: string) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({ where: { id: categoryId, deletedAt: null } });
    if (!category) throw CustomError.notFoundRequest('Category not found');
    const deleted = await categoryRepository.save({
      id: categoryId,
      ...category,
      deletedAt: new Date()
    });
    // console.log(deleted)
    return CategoryEntity.getObjectFromJson(deleted);
  }
}