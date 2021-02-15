import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { User, UserObject, UserWithoutPassword } from "../domain/user.model";
import { UserRepository } from "../domain/userRepository.interface";

export class UpdateUser {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async update(uuid: string, user: any): Promise<UserWithoutPassword> {
    const userDB = await this.userRepository.update(uuid, user);

    if (!userDB) throw new Http4xxException("user not found", 404);

    return {
      email: userDB.email,
      image: userDB.image,
      name: userDB.name,
      uuid: userDB.uuid,
      validated: userDB.validated,
    };
  }
}
