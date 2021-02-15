import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserPassword implements ValueObject {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.checkIfNull();

    if (!UserPassword.isValidPassword(this._value))
      throw new Http4xxException("invalid password", 400);
  }

  get value(): string {
    return this._value;
  }

  public setValue(value: string): void {
    if (UserPassword.isValidPassword(value))
      throw new Http4xxException("invalid Password", 400);

    this._value = value;
  }

  private checkIfNull(): void {
    if (!this._value) throw new NullValueException("password", 400);
  }

  public static isValidPassword(value: string): boolean {
    const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]))/;
    return regExp.test(value) && value.length >= 8;
  }
}
