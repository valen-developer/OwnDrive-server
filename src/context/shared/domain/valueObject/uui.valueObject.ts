import { NullValueException } from "../exceptions/NullValue.exception";
import { ValueObject } from "./valueObject.interface";

export class UUID implements ValueObject {
  public readonly value: string;

  constructor(value: string) {
    this.value = value;
    this.checkIfNull();
  }

  private checkIfNull(): void {
    if (!this.value) throw new NullValueException("uuid", 400);
  }
}
