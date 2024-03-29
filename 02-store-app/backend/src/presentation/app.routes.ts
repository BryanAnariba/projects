import { Router } from "express";
import { CategoryRoutes } from "./categories/routes";
import { ProductsRoutes } from "./products/routes";
import { OrdersRoutes } from "./orders/routes";
import { UserRoutes } from "./users/routes";

export class AppRoutes {

  public static get routes(): Router {
    const router: Router = Router();

    router.use('/categories', CategoryRoutes.routes);
    router.use('/products', ProductsRoutes.routes);
    router.use('/orders', OrdersRoutes.routes);
    router.use('/users', UserRoutes.routes);
    
    return router;
  }
}