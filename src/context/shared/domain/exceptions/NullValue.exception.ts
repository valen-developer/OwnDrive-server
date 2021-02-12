export class NullValueException implements Error {
  public readonly name: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(value: string, statusCode: number) {
    this.name = "null value exception";
    this.message = `${value} shouldn´t be null`;
    this.statusCode = statusCode;
  }
}
