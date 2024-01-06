import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services";

export class CategoryRoutes {

  public static get routes(): Router {
    const router: Router = Router();
    const categoriesService = new CategoryService();
    const categoryController = new CategoryController(categoriesService);

    router
      .get('', categoryController.getAll)
      .get('/:categoryId', categoryController.getOne)
      .post('', categoryController.createOne)
      .put('/:categoryId', categoryController.updateOne)
      .delete('/:categoryId', categoryController.deleteOne);
      
    return router;
  }
}