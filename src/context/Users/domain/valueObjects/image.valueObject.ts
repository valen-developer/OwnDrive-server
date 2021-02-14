import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserImage implements ValueObject {
  private _value: string | null;

  constructor(value: string | null) {
    this._value = value;
  }

  get value(): string | null {
    return this._value;
  }

  public setValue(value: any): void {
    this._value = value;
  }
}
