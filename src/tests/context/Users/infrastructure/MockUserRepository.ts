import { User } from "../../../../context/Users/domain/user.model";
import { UserRepository } from "../../../../context/Users/domain/userRepository.interface";

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }

  public async get(uuid: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async getByEmail(email: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public async delete(uuid: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async update(uuid: string, user: any): Promise<any> {
    let userDB: User | null = null;

    this.users.forEach((userIn) => {
      if (userIn.uuid._value === uuid) {
        userIn.update(user);
        userDB = userIn;
      }
    });

    return userDB;
  }
}
