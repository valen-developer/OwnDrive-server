import { User } from "./user.model";

export interface UserRepository {
  save(user: User): Promise<void>;
  find(uuid: string): Promise<any>;
  delete(uuid: string): Promise<void>;
  update(uuid: string, user: User): Promise<void>;
}
