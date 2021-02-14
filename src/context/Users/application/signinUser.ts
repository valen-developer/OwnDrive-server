import { Http4xxException } from "../../shared/domain/exceptions/Http4xx.exception";
import { Crypt } from "../../shared/domain/interfaces/crypt.interface";
import { User } from "../domain/user.model";
import { UserRepository } from "../domain/userRepository.interface";
import { UserFinder } from "./findUser";

export class Signin {
  private userRepository: UserRepository;
  private crypt: Crypt;

  constructor(userRepository: UserRepository, crypt: Crypt) {
    this.userRepository = userRepository;
    this.crypt = crypt;
  }

  public async signin(email: string, password: string): Promise<void> {
    const userFinder = new UserFinder(this.userRepository);
    const user = await userFinder.byEmail(email);

    if (!this.validatePassword(user, password))
      throw new Http4xxException("invalid email or password", 401);
  }

  private validatePassword(user: User, password: string): boolean {
    if (!user.isValidated) return user.password.value === password;

    return this.crypt.compareSync(password, user.password.value);
  }
}
