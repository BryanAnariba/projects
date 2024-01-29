import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CreateCategoryDto, PaginationDto, UpdateCategoryDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class CategoryController {

  constructor (private readonly categoryService: CategoryService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error});
    return res.status(400).json({error: `Error: ${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    const {page=1, limit=10} = req.query;
    const [error, paginationDto] = PaginationDto.create({page: +page, limit: +limit});
    if (error) return res.status(400).json({error: error});

    this.categoryService.getCategories(paginationDto)
      .then(categories => {
        return res.status(200).json(categories);
      })
      .catch(error => this.handleError(error, res));
  }

  public getByName = (req: Request, res: Response) => {
    const {page, limit} = req.query;
    const [error, paginationDto] = PaginationDto.create({page: +page, limit: +limit});
    if (error) return res.status(400).json({error: error});

    if (!req.query.name) {
      this.categoryService.getCategories(paginationDto)
      .then(categories => {
        return res.status(200).json(categories);
      })
      .catch(error => this.handleError(error, res));
    }

    if (req.query.name) {
      const {name} = req.query;
      this.categoryService.getCategoriesByName(paginationDto, `${name}`)
      .then(categories => {
        return res.status(200).json(categories);
      })
      .catch(error => this.handleError(error, res));
    }
  }

  public getOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;
    if (!categoryId) return res.status(400).json({error: 'Category is required and must be number'});

    this.categoryService.getCategory(categoryId.toString())
      .then(category => {
        return res.status(200).json(category);
      })
      .catch(error => this.handleError(error, res));
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({error: error});
    
    this.categoryService.createCategory(createCategoryDto)
      .then(category => {
        return res.status(201).json(category);
      })
      .catch(error => this.handleError(error, res));
  }

  public editOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;
    if (!categoryId) return res.status(400).json({error: 'Category Id is not found'});

    const [error, updateCategoryDto] = UpdateCategoryDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    this.categoryService.updateCategory(updateCategoryDto, categoryId.toString())
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch(error => this.handleError(error, res));
  }

  public deleteOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;

    this.categoryService.deleteCategory(categoryId.toString())
      .then(category => {
        return res.status(200).json(category);
      })
      .catch(error => this.handleError(error, res));
  }
}