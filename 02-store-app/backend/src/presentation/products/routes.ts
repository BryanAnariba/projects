import { Router } from "express";
import { ProductController } from "./controller";
import { CategoryService, ProductService } from "../services";
import { upload } from "../../config/multer";

export class ProductsRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const productService = new ProductService();
    const productController = new ProductController(productService);

    router
    .get('', productController.getAll)
    .get('/:productId', productController.getOne)
    .post('', 
    [
      upload.single('image')
    ], 
    productController.createOne)
    .put(
      '/:productId', 
      [
        upload.single('image')
      ],
      productController.editOne
    )
    .delete('/:productId', productController.deleteOne);
    return router;
  }
}