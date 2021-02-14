import { Http4xxException } from "../exceptions/Http4xx.exception";
import { NullValueException } from "../exceptions/NullValue.exception";
import { ValueObject } from "./valueObject.interface";

export class UUID implements ValueObject {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.checkIfNull();
  }

  setValue(value: any): void {
    throw new Http4xxException("uuid can not be updated", 400);
  }

  get value() {
    return this._value;
  }

  private checkIfNull(): void {
    if (!this._value) throw new NullValueException("uuid", 400);
  }
}
