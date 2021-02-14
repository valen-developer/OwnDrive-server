import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";
import { UserPassword } from "./password.valueObject";

export class UserEmail implements ValueObject {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.checkIfNull();
    this.checkIfValid();
  }

  public setValue(value: any): void {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  private checkIfNull(): void {
    if (!this._value) throw new NullValueException("email", 400);
  }

  private checkIfValid(): void {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValid = regExp.test(this._value);

    if (!isValid) throw new Http4xxException("email invalid", 400);
  }
}
