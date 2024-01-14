import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CreateCategoryDto, UpdateCategoryDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class CategoryController {

  constructor (private readonly categoryService: CategoryService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error});
  }

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({error: error});
    return res.status(200).json(createCategoryDto);
  }

  public editOne = (req: Request, res: Response) => {
    const [error, updateCategoryDto] = UpdateCategoryDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    return res.status(200).json(updateCategoryDto);
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-deleteOne is working');
  }
}