export class PaginationDto {

  constructor (
    public readonly limit: number,
    public readonly page: number,
  ) {}

  public static pagination(object: {[key: string]: any}): [string?, PaginationDto?] {
    const {limit, page} = object;

    if (limit && typeof limit !== "number") {
      return ['limit must be a number', undefined];
    }

    if (limit <= 0) {
      return ['limit must be greater than zero', undefined];
    }

    if (page && typeof page !== "number") {
      return ['page must be a number', undefined];
    }

    if (page <= 0) {
      return ['page must be greater than zero', undefined];
    }

    return [undefined, new PaginationDto(limit, page)];
  }
}