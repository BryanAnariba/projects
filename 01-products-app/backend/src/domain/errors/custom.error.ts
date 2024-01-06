export class CustomError extends Error {

  constructor(public readonly message: string, public readonly statusCode: number) {
    super(message);
  }

  public static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  public static unauthorizedError(message: string) {
    return new CustomError(message, 401);
  }

  public static forbidenError(message:string) {
    return new CustomError(message, 403);
  }

  public static notFoundError(message: string) {
    return new CustomError(message, 404);
  }

  public static internalServerError(message: string) {
    return new CustomError(message, 500);
  }
  
}