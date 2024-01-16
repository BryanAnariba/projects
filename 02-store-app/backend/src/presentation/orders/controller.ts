import { Request, Response } from "express";
import { OrderService } from "../services";
import { CreateOrderDto, PaginationDto, UpdateOrderDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class OrderController {

  constructor (private readonly orderService: OrderService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error.message});
    return res.status(400).json({error: `${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    const {userId} = req.params;
    if (!userId) return res.status(400).json({error: 'User id is required'});

    const {page=1, limit=10} = req.query;
    const [error, paginationDto] = PaginationDto.create({limit: Number(limit), page: Number(page)});
    if (error) return res.status(400).json({error: error});
    
    this.orderService.getOrders(paginationDto, userId.toString())
      .then(orders => {
        return res.status(200).json(orders);
      })
      .catch(error => this.handleError(error, res));
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json('@Orders-getOne is working');
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) return res.status(400).json({error: error});
    
//    return res.status(201).json(createOrderDto);
    this.orderService.createOrder(createOrderDto)
      .then(order => {
        return res.status(201).json(order);
      })
      .catch(error => this.handleError(error, res));
  }

  public editOne = (req: Request, res: Response) => {
    // const [error, updateOrderDto] = UpdateOrderDto.update(req.body);
    // if (error) return res.status(400).json({error: error});

    // const {orderId} = req.params;
    // if (!orderId) return res.status(400).json({error: 'Order id is required'});

    // return res.status(200).json(updateOrderDto);
    throw new Error(`Not implemented yet`);
  }

  public deleteOne = (req: Request, res: Response) => {
    //return res.status(200).json('@Orders-deleteOne is working');
    throw new Error(`Not implemented yet`);
  }
}