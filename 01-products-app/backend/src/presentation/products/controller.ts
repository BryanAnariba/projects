import { Request, Response } from "express";
import { ProductService } from "../services";
import { CreateProductDto, UpdateProductDto } from "../../domain/dtos";

export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) {}
  public getAll = (req: Request, res: Response) => {
    return res.status(200).json({data: '@getAll Products Works!'});
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@getOne Products Works!'});
  }

  public createOne= (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    return res.status(201).json(createProductDto);
  }

  public updateOne = (req: Request, res: Response) => {
    const {productId} = req.params;

    const [error, updateCategoryDto ] = UpdateProductDto.update(req.body);
    if (error) return res.status(200).json({error: error});

    return res.status(200).json({
      ...updateCategoryDto,
      productId: productId
    });
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@deleteOne Products Works!'});
  }

}