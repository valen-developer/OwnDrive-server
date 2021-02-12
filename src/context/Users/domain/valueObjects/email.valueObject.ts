import { Http4xxException } from "../../../shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserEmail implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();
    this.checkIfValid();
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("email", 400);
  }

  private checkIfValid(): void {
    const regExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const isValid = regExp.test(this.value);

    if (!isValid) throw new Http4xxException("email invalid", 400);
  }
}
