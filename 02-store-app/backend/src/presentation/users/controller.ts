import { Request, Response } from "express";
import { UserService } from "../services";

export class UserController {

  constructor (public readonly userService: UserService) {}

  public getAll = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public getAll Works'});
  }

  public getOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public getOne Works'});
  }

  public createOne = (req: Request, res: Response) => {
    return res.status(201).json({data: '@public createOne Works'});
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public editOne Works'});
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public deleteOne Works'});
  }
}