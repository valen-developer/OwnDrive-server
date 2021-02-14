import { User, UserObject } from "../../../../context/Users/domain/user.model";
import { UserRepository } from "../../../../context/Users/domain/userRepository.interface";

export class MockUserRepository implements UserRepository {
  private users: User[] = [];

  public async save(user: User): Promise<void> {
    this.users.push(user);
  }

  public async get(uuid: string): Promise<any> {
    let userDB: UserObject | null = null;

    this.users.forEach((user) => {
      if (user.uuid.value === uuid) userDB = user.toObject();
    });

    return userDB;
  }

  public async getByEmail(email: string): Promise<any> {
    let userDB: UserObject | null = null;

    this.users.forEach((user) => {
      if (user.email.value === email) userDB = user.toObject();
    });

    return userDB;
  }

  public async delete(uuid: string): Promise<void> {
    const auxUsers: User[] = [];

    this.users.forEach((user) => {
      if (!(user.uuid.value === uuid)) auxUsers.push(user);
    });

    this.users = auxUsers;
  }

  public async update(uuid: string, user: any): Promise<any> {
    let userDB: UserObject | null = null;

    this.users.forEach((userIn) => {
      if (userIn.uuid.value === uuid) {
        userIn.update(user);
        userDB = userIn.toObject();
      }
    });

    return userDB;
  }
}
