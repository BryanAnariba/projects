import { Request, Response } from "express";
import { OrderService } from "../services";
import { CreateOrderDto, UpdateOrderDto } from "../../domain/dto";

export class OrderController {

  constructor (private readonly orderService: OrderService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-getAll is working');
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) return res.status(400).json({error: error});
    
    return res.status(201).json(createOrderDto);
  }

  public editOne = (req: Request, res: Response) => {
    const [error, updateOrderDto] = UpdateOrderDto.update(req.body);
    if (error) return res.status(400).json({error: error});

    const {orderId} = req.params;
    if (!orderId) return res.status(400).json({error: 'Order id is required'});

    return res.status(200).json(updateOrderDto);
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-deleteOne is working');
  }
}