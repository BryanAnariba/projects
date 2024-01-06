import { Router } from "express";
import { CategoryRoutes } from "./categories/routes";
import { ProductRoutes } from "./products/routes";

export class AppRoutes {

  public static get routes(): Router {
    const router: Router = Router();

    router.use('/categories', CategoryRoutes.routes);
    router.use('/products', ProductRoutes.routes);
    return router;
  }
}