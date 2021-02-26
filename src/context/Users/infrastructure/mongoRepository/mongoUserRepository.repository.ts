import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
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

    try {
      await userMongo.save();
    } catch (error) {
      const keyPattern = error.keyPattern;
      if (!keyPattern) throw new Http4xxException("server error", 500);

      const keys = Object.keys(keyPattern);
      throw new Http4xxException(`${keys[0]} already exist`, 400);
    }
  }

  public async delete(uuid: string): Promise<void> {
    await UserMongo.deleteOne({ uuid });
  }

  public async update(uuid: string, user: any): Promise<any> {
    return await UserMongo.findOneAndUpdate({ uuid }, user);
  }
}
