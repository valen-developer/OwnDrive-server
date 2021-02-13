import { UserRepository } from "../domain/userRepository.interface";

import { User, UserObject } from "../domain/user.model";

export class UserCreator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async create({
    uuid,
    name,
    password,
    image,
    validated,
    email,
  }: UserObject): Promise<void> {
    const user = new User({ uuid, name, email, password, image, validated });

    await this.userRepository.save(user);
  }
}
