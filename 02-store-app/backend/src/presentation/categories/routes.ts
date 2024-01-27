import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../services";

export class CategoryRoutes {

  public static get routes(): Router {
    const router = Router();

    const categoryService = new CategoryService();
    const categoryController = new CategoryController(categoryService);

    router 
      .get('', categoryController.getAll)
      .get('/:categoryId', categoryController.getOne)
      .get('/search-by', categoryController.getByName)
      .post('', categoryController.createOne)
      .put('/:categoryId', categoryController.editOne)
      .delete('/:categoryId', categoryController.deleteOne);

    return router;
  }
}
