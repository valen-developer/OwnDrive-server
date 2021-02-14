export interface JWT {
  decode(token: string, options: any): void;
  sign(
    payload: string | object | Buffer,
    secretkey: string,
    options: any
  ): string;
  verify(token: string, secret: string): boolean;
}
