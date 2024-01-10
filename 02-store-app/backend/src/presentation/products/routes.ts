import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";

export class ProductsRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    router
    .get('', productController.getAll)
    .get('/:productId', productController.getOne)
    .post('', productController.createOne)
    .put('/:productId', productController.editOne)
    .delete('/:productId', productController.deleteOne);
    return router;
  }
}