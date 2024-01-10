import { Router } from "express";
import { OrderController } from "./controller";
import { OrderService } from "../services";

export class OrdersRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const orderService = new OrderService();
    const orderController = new OrderController(orderService);

    router
      .get('', orderController.getAll)
      .get('/:orderId', orderController.getOne)
      .post('', orderController.createOne)
      .put('/:orderId', orderController.editOne)
      .delete('/:orderId', orderController.deleteOne);

    return router;
  }
}