export class Http4xxException implements Error {
  public readonly name: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    this.name = "http error";
    this.message = message;
    this.statusCode = statusCode;
  }
}
