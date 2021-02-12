import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserPassword implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();
    this.checkIfValidPassword();
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("password", 400);
  }

  private checkIfValidPassword(): void {
    const regExp = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,20})/;
    const isValid = regExp.test(this.value);

    if (!isValid) throw new Http4xxException("bad request", 400);
  }
}
