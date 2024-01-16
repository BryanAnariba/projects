import { regularExps } from "../../../config/regex-expressions";

export class CreateUserDto {

  constructor (
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {}

  public static create(json: {[key: string]: any}): [string?, CreateUserDto?] {
    const {name, email, password} = json;

    if (!name || name.trim().length === 0) return ['Name is required', undefined];

    if (!email || email.trim().length === 0) return ['Email is required', undefined];

    if (!regularExps.email.test(email)) return ['Invalid email', undefined];

    if (!password || password.trim().length < 6) return ['Password is required and must be greater than six characters', undefined];

    return [undefined, new CreateUserDto(name, email, password)];
  }
}