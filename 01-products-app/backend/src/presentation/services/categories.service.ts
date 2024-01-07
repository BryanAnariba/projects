import { AppDataSource } from "../../config/data-source";
import { Category } from "../../config/entity";
import { CustomError } from "../../domain";
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain/dtos";

export class CategoryService {

  public async getCategories(paginationDto: PaginationDto) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const [categories, totalCategories] = await Promise.all([
      categoryRepository.find({
        where: {
          deletedAt: null,
          isActive: true,
        },
        skip: (paginationDto.page - 1) * paginationDto.limit,
        take: paginationDto.limit,
      }),
      categoryRepository.countBy({
        deletedAt: null,
        isActive: true,
      })
    ]);

    return {
      totalCategories: totalCategories,
      page: paginationDto.page,
      limit: paginationDto.limit,
      previous: `${ paginationDto.page - 1 > 0 ? `/api/categories?=page${paginationDto.page - 1}&limit=${paginationDto.limit}` : null }`,
      current: `/api/categories?page=${paginationDto.page}&limit${paginationDto.limit}`,
      next: `/api/categories?page=${paginationDto.page + 1}&limit=${paginationDto.limit}`,
      categories: categories,
    };
  }

  public async getCategory(categoryId: number) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({
      where: {
        id: categoryId,
        isActive: true,
        deletedAt: null,
      },
    });
    return category;
  }

 public async createCategory(createCategoryDto: CreateCategoryDto) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await categoryRepository.findOne({where: { name: createCategoryDto.name }});
    if (category) throw CustomError.badRequest('Category Already Exists');
    const newCategory = await categoryRepository.save(createCategoryDto);
    return newCategory;
  }

  public async upadateCategory(updateCategoryDto: UpdateCategoryDto, categoryId: number) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await this.getCategory(categoryId);
    if (!category) throw CustomError.notFoundError('Category not found');
    return await categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  public async deleteCategory(categoryId: number) {
    const categoryRepository = AppDataSource.getRepository(Category);
    const category = await this.getCategory(categoryId);
    if (!category) throw CustomError.notFoundError('Category not found');
    const deleted = await categoryRepository.save({
      ...category,
      deletedAt: new Date(),
      isActive: false,
    });
    return deleted;
  }
  
}