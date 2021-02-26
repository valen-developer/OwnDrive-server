import jwt from "jsonwebtoken";

import { JWT } from "../domain/interfaces/jsonwebtoken.interface";

export class JSONWEBTOKEN implements JWT {
  public decode(token: string, options: any): any {
    return jwt.decode(token, options);
  }

  public sign(
    payload: string | object | Buffer,
    secretkey: string,
    options = {}
  ): string {
    return jwt.sign(payload, secretkey, options);
  }

  public verify(token: string, secret: string): boolean {
    let error: string | null = null;

    jwt.verify(token, secret, (err) => {
      if (err) error = err.message;
    });

    if (!error) return true;

    return false;
  }
}
