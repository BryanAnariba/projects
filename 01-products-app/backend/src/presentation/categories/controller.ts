import { Request, Response } from "express";
import { CategoryService } from "../services";
import { CreateCategoryDto, UpdateProductDto } from "../../domain/dtos";

export class CategoryController {

  constructor (
    private readonly categoryService: CategoryService
  ) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json({data: '@getAll Categories Works!'});
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@getOne Categories Works!'});
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    return res.status(201).json(createCategoryDto);
  }

  public updateOne = (req: Request, res: Response) => {
    const {categoryId} = req.params;

    const [error, updateProductDto] = UpdateProductDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    return res.status(200).json({
      ...updateProductDto,
      categoryId: categoryId
    });
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@deleteOne Categories Works!'});
  }

}