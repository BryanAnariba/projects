import { Request, Response } from "express";
import { ProductService } from "../services";
import { CreateProductDto, UpdateProductDto } from "../../domain/dto";

export class ProductController {

  constructor (private readonly productService: ProductService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Products-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({error: error});
    
    return res.status(200).json(createProductDto);
  }

  public editOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product Id is required'});

    const [error, updateProductDto] = UpdateProductDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    return res.status(200).json(updateProductDto);
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-deleteOne is working');
  }
}