import { Request, Response } from "express";
import { ProductService } from "../services";
import { CreateProductDto, UpdateProductDto } from "../../domain/dtos";
import { CustomError } from "../../domain";

export class ProductController {

  constructor(
    private readonly productService: ProductService
  ) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});

    return res.status(500).json({error: `Error: ${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    this.productService.getProducts()
      .then((products) => {
        return res.status(200).json(products)
      })
      .catch((error) => this.handleError(error, res));
  }

  public getOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product Id is required'});

    this.productService.getProduct(+productId)
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch((error) => this.handleError(error, res));
  }

  public createOne= (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    this.productService.createProduct(createProductDto)
      .then((product) => {
        return res.status(201).json(product);
      })
      .catch((error) => this.handleError(error, res));
  }

  public updateOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product id is required'});
    
    const [error, updateCategoryDto ] = UpdateProductDto.update(req.body);
    if (error) return res.status(200).json({error: error});

    this.productService.upadateProduct(updateCategoryDto, +productId)
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch((error) => this.handleError(error, res));

  }

  public deleteOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product id is required'});

    this.productService.deleteProduct(+productId)
      .then((product) => {
        return res.status(200).json(product);
      })
      .catch((error) => this.handleError(error, res));
  }

}