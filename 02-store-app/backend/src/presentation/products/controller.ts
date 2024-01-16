import { Request, Response } from "express";
import { ProductService } from "../services";
import { CreateProductDto, PaginationDto, UpdateProductDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";
import { upload } from "../../config/multer";
import fs from 'node:fs';
import path from "node:path";

export const mimeTypes: string[] = ['image/jpeg', 'image/png', 'image/gif',];

export class ProductController {

  constructor (private readonly productService: ProductService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(400).json({error: `Error: ${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    const {page=1, limit=10} = req.query;
    const [error, paginationDto] = PaginationDto.create({limit: Number(limit), page: Number(page)});
    if (error) return res.status(400).json({error: error});

    this.productService.getProducts(paginationDto)
      .then(products => {
        return res.status(200).json(products);
      })
      .catch(error => this.handleError(error, res));

  }

  public getOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product Id Is required'});

    this.productService.getProduct(productId.toString())
      .then(product => {
        return res.status(200).json(product);
      })
      .catch(error => this.handleError(error, res));
  }

  public createOne = (req: Request, res: Response) => {
    if(!req.file) return res.status(400).json({error: 'Image is required'});
    if (!mimeTypes.includes(req.file.mimetype)) return res.status(400).json({error: `IMG Types accepted ${mimeTypes}`});

    const [error, createProductDto] = CreateProductDto.create({...req.body, image: req.file.filename});
    if (error) return res.status(400).json({error: error});
    this.productService.createProduct(createProductDto)
      .then((product) => {
        upload.single('image');
        res.status(201).json(product);
      })
      .catch(error => {
        if (fs.existsSync(`${__dirname}../../../../uploads/${req.file.filename}`)) {
          fs.unlinkSync(`${__dirname}../../../../uploads/${req.file.filename}`);
        }
        this.handleError(error, res)
      });
  }

  public editOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Product Id is required'});

    if(req.file && !mimeTypes.includes(req.file?.mimetype)) return res.status(400).json({error: `IMG Types accepted ${mimeTypes}`});
    const [error, updateProductDto] = UpdateProductDto.update({...req.body, image: req.file?.filename || null });
    if (error) return res.status(400).json({error: error});

    this.productService.updateOne(updateProductDto, productId.toString())
      .then(product => {
        return res.status(200).json(product);
      })
      .catch(error => this.handleError(error, res));
  }

  public deleteOne = (req: Request, res: Response) => {
    const {productId} = req.params;
    if (!productId) return res.status(400).json({error: 'Id is required'});

    this.productService.deleteOne(productId.toString())    
      .then(product => {
        return res.status(200).json(product);
      })
      .catch(error => this.handleError(error, res));
  }
}