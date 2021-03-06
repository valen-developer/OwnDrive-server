import { UUID } from "../../shared/domain/valueObject/uui.valueObject";
import { UserEmail } from "./valueObjects/email.valueObject";
import { UserImage } from "./valueObjects/image.valueObject";
import { UserName } from "./valueObjects/name.valueObject";
import { UserPassword } from "./valueObjects/password.valueObject";

export class User {
  public readonly uuid: UUID;
  public readonly name: UserName;
  public readonly email: UserEmail;
  public readonly password: UserPassword;
  public readonly image: UserImage;
  private _validated: boolean;

  constructor({ uuid, name, email, password, image, validated }: UserObject) {
    this.uuid = new UUID(uuid);
    this.name = new UserName(name);
    this.email = new UserEmail(email);
    this.password = new UserPassword(password);
    this.image = new UserImage(image);
    this._validated = validated;
  }

  get validated(): boolean {
    return this._validated;
  }

  public toObject(): UserObject {
    return {
      uuid: this.uuid.value,
      name: this.name.value,
      password: this.password.value,
      email: this.email.value,
      image: this.image.value,
      validated: this.validated,
    };
  }

  public toObjectWithoutPassword(): UserWithoutPassword {
    return {
      uuid: this.uuid.value,
      email: this.email.value,
      image: this.image.value,
      name: this.name.value,
      validated: this.validated,
    };
  }

  public update(user: any) {
    user.email ? this.email.setValue(user.email) : null;
    user.image ? this.image.setValue(user.image) : null;
    user.validated ? (this._validated = user.validated) : null;
    user.name ? this.name.setValue(user.name) : null;
  }
}

export interface UserObject {
  uuid: string;
  name: string;
  email: string;
  password: string;
  image: string | null;
  validated: boolean;
}

export interface UserWithoutPassword {
  uuid: string;
  name: string;
  email: string;
  image: string | null;
  validated: boolean;
}
