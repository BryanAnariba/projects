import { Request, Response } from "express";
import { ProductService } from "../services";

export class ProductController {

  constructor (private readonly productService: ProductService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Products-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-createOne is working');
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-editOne is working');
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json('@Products-deleteOne is working');
  }
}