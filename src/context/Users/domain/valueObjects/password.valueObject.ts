import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserPassword implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();

    if (!UserPassword.isValidPassword(this.value))
      throw new Http4xxException("invalid password", 400);
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("password", 400);
  }

  public static isValidPassword(value: string): boolean {
    const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/;
    return regExp.test(value) && value.length >= 8 && value.length <= 20;
  }
}
