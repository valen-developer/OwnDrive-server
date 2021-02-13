import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserName implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("user name", 400);
  }
}
