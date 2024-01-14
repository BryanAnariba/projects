export class CustomError extends Error {

  constructor (public readonly message: string, public readonly statusCode: number) {
    super(message);
  }

  public static badRequest(message: string): CustomError {
    return new CustomError(message, 400);
  }

  public static unauthorizedRequest(message: string): CustomError {
    return new CustomError(message, 401);
  }

  public static notFoundRequest(message: string): CustomError {
    return new CustomError(message, 404);
  }

  public static internalServerRequest(message: string): CustomError {
    return new CustomError(message, 500);
  }
}