import bcrypt from "bcrypt";
import { Crypt } from "../domain/interfaces/crypt.interface";

export class Bcrypt implements Crypt {
  hashSync(data: string, saltOrRounds: number): string {
    return bcrypt.hashSync(data, saltOrRounds);
  }
  compareSync(data: string, encrypted: string): boolean {
    return bcrypt.compareSync(data, encrypted);
  }
}
