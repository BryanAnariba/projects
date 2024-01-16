import { Request, Response } from "express";
import { UserService } from "../services";
import { CreateUserDto, PaginationDto } from "../../domain/dto";
import { CustomError } from "../../domain/errors";

export class UserController {

  constructor (public readonly userService: UserService) {}

  private handleError(error: unknown, res: Response) {
    if (error instanceof CustomError) return res.status(error.statusCode).json({error: error});
    return res.status(400).json({error: `${error}`});
  }

  public getAll = (req: Request, res: Response) => {
    const {page=1, limit=10} = req.query;
    const [error, paginationDto] =  PaginationDto.create({page: Number(page), limit: Number(limit)});
    if (error) return res.status(400).json({error:error});

    this.userService.getUsers(paginationDto)
      .then(users => {
        return res.status(200).json(users);
      })
      .catch(error => this.handleError(error, res))
  }

  public getOne = (req: Request, res: Response) => {
    const {userId} = req.params;
    if (!userId) return res.status(400).json({error: 'User id is required'});

    this.userService.getUser(userId.toString())
      .then(user => {
        return res.status(200).json(user);
      })
      .catch(error => this.handleError(error, res));
  }

  public createOne = (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);
    if (error) return res.status(400).json({error: error});

    this.userService.createUser(createUserDto)
      .then(user => {
        return res.status(201).json(user);
      })
      .catch((error) => {
        this.handleError(error, res);
      });
  }

  public editOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public editOne Works'});
  }

  public deleteOne = (req: Request, res: Response) => {
    return res.status(200).json({data: '@public deleteOne Works'});
  }
}