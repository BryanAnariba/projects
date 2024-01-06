import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const productsService = new ProductService();
    const productController = new ProductController(productsService);

    router
      .get('', productController.getAll)
      .get('/:productId', productController.getOne)
      .post('', productController.createOne)
      .put('/:productId', productController.updateOne)
      .delete('/:productId', productController.deleteOne);

    return router;
  }
}