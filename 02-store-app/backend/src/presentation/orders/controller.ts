import { Request, Response } from "express";
import { OrderService } from "../services";

export class OrderController {

  constructor (private readonly orderService: OrderService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-createOne is working');
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-editOne is working');
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-deleteOne is working');
  }
}