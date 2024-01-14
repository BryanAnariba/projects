import { Router } from "express";
import { UserController } from "./controller";
import { UserService } from "../services";

export class UserRoutes {

  public static get routes(): Router {
    const router: Router = Router();

    const userService = new UserService();
    const userController = new UserController(userService);

    router
      .get('', userController.getAll)
      .get('/:userId', userController.getOne)
      .post('', userController.createOne)
      .put('/:userId', userController.editOne)
      .delete('/:userId', userController.deleteOne);

    return router;
  }
}