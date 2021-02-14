import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";

import { User, UserWithoutPassword } from "../domain/user.model";

import { UserFinder } from "./findUser";

import { Crypt } from "../../shared/domain/interfaces/crypt.interface";
import { UserRepository } from "../domain/userRepository.interface";

export class Signin {
  private userRepository: UserRepository;
  private crypt: Crypt;

  constructor(userRepository: UserRepository, crypt: Crypt) {
    this.userRepository = userRepository;
    this.crypt = crypt;
  }

  public async signin(
    email: string,
    password: string
  ): Promise<UserWithoutPassword> {
    const userFinder = new UserFinder(this.userRepository);
    const user = await userFinder.byEmail(email);

    if (!this.validatePassword(user, password))
      throw new Http4xxException("invalid email or password", 401);

    return user.toObjectWithoutPassword();
  }

  private validatePassword(user: User, password: string): boolean {
    if (!user.validated) return user.password.value === password;

    console.log(this.crypt);

    const resp = this.crypt.compareSync(password, user.password.value);

    return resp;
  }
}
