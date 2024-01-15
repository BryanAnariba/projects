import { CustomError } from "../../errors";

export class PaginationDto {

  constructor (
    public readonly page: number,
    public readonly limit: number
  ) {}

  public static create(json: {[key: string]: any}): [string?, PaginationDto?] {
    const {page, limit} = json;

    if (!page) return ['Page is required', undefined];

    if (typeof page !== 'number') return ['Page must be a number', undefined];

    if (page < 0) return ['Page must be greater than zero', undefined];

    if (!limit) return ['Limit is required', undefined];

    if (typeof limit !== 'number') return ['Limit is required', undefined];

    if (limit < 0) return ['Limit must be greater than zero', undefined];

    return [undefined, new PaginationDto(page, limit)];
  }
}