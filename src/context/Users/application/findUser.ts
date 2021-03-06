import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { User } from "../domain/user.model";
import { UserRepository } from "../domain/userRepository.interface";

export class UserFinder {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async byEmail(email: string): Promise<User> {
    const userDB = await this.userRepository.getByEmail(email);

    if (!userDB) throw new Http4xxException("user not found", 404);

    return new User({
      email: userDB.email,
      image: userDB.image,
      name: userDB.name,
      password: userDB.password,
      uuid: userDB.uuid,
      validated: userDB.validated,
    });
  }

  public async byUuid(uuid: string): Promise<User> {
    let userDB = await this.userRepository.get(uuid);
    if (userDB instanceof Array) userDB = userDB[0];

    if (!userDB) throw new Http4xxException("user not found", 404);

    return new User({
      email: userDB.email,
      image: userDB.image,
      name: userDB.name,
      password: userDB.password,
      uuid: userDB.uuid,
      validated: userDB.validated,
    });
  }
}
