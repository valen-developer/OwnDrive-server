import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserPassword implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();
    UserPassword.checkIfValidPassword(this.value);
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("password", 400);
  }

  public static checkIfValidPassword(value: string): void {
    const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/;
    const isValid = regExp.test(value);

    if (!isValid) throw new Http4xxException("invalid password", 400);
  }
}
