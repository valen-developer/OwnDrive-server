import { User } from "./user.model";

export interface UserRepository {
  save(user: User): Promise<void>;
  get(uuid: string): Promise<any>;
  getByEmail(email: string): Promise<any>;
  delete(uuid: string): Promise<void>;
  update(uuid: string, user: User): Promise<void>;
}
