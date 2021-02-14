import jwt from "jsonwebtoken";

import { JWT } from "../domain/interfaces/jsonwebtoken.interface";

export class JSONWEBTOKEN implements JWT {
  decode(token: string, options: any): any {
    return jwt.decode(token, options);
  }
  sign(
    payload: string | object | Buffer,
    secretkey: string,
    options = {}
  ): string {
    return jwt.sign(payload, secretkey, options);
  }
  verify(token: string, secret: string): boolean {
    const verify = jwt.verify(token, secret);

    if (verify) return true;

    return false;
  }
}
