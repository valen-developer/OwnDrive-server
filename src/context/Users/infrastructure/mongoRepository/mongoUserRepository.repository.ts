import { User } from "../../domain/user.model";
import { UserRepository } from "../../domain/userRepository.interface";

import UserMongo from "./mongoUser.model";

export class MongoUserRepository implements UserRepository {
  public async get(uuid: string): Promise<any> {
    return await UserMongo.find({ uuid });
  }

  public async getByEmail(email: string): Promise<any> {
    return await UserMongo.findOne({ email });
  }

  public async save(user: User): Promise<void> {
    const userMongo = new UserMongo(user.toObject());
    await userMongo.save();
  }

  public async delete(uuid: string): Promise<void> {
    await UserMongo.deleteOne({ uuid });
  }

  public async update(uuid: string, user: any): Promise<any> {
    return await UserMongo.findOneAndUpdate({ uuid }, user);
  }
}
