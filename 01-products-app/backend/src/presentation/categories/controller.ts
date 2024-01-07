import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CreateCategoryDto, UpdateProductDto } from "../../domain/dtos";
import { CustomError } from "../../domain";

export class CategoryController {

  constructor (
    private readonly categoryService: CategoryService
  ) {}

  private handleError(error: unknown, res: Response): Response {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(500).json({error: `Error: ${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    this.categoryService.getCategories()
      .then((categories) => {
        return res.status(200).json(categories);
      })
      .catch((error) => this.handleError(error, res));
  }

  public getOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;
    if (!categoryId) return res.status(400).json({error: 'Category id is required'});

    this.categoryService.getCategory(Number(categoryId))
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch((error) => this.handleError(error, res));
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    this.categoryService.createCategory(createCategoryDto)
      .then((category) => {
        return res.status(201).json(category);
      })
      .catch((error) => this.handleError(error, res));
  }

  public updateOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;
    if (!categoryId) return res.status(400).json({error: 'Category id is required'});

    const [error, updateProductDto] = UpdateProductDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    this.categoryService.upadateCategory(updateProductDto, Number(categoryId))
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch((error) => this.handleError(error, res));
  }

  public deleteOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;
    if (!categoryId) return res.status(400).json({error: 'Category id is required'});

    this.categoryService.deleteCategory(+categoryId)
      .then((category) => {
        return res.status(200).json(category);
      })
      .catch((error) => this.handleError(error, res));
  }

}