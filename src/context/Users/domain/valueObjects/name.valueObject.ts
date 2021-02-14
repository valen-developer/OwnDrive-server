import { NullValueException } from "../../../shared/domain/exceptions/NullValue.exception";
import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserName implements ValueObject {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.checkIfNull();
  }

  get value(): string {
    return this._value;
  }

  public setValue(value: any): void {
    this._value = value;
    this.checkIfNull();
  }

  private checkIfNull(): void {
    if (!this._value) throw new NullValueException("user name", 400);
  }
}
