import { Request, Response } from "express";
import { CategoryService } from "../services";

export class CategoryController {

  constructor (private readonly categoryService: CategoryService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-createOne is working');
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json('@Categories-editOne is working');
  }

  public deleteOne = (req: Request, res: Response) => {
      return res.status(200).json('@Categories-deleteOne is working');
  }
}