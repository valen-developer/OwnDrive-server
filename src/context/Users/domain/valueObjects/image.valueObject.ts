import { ValueObject } from "../../../shared/domain/valueObject/valueObject.interface";

export class UserImage implements ValueObject {
  public readonly value: string | null;

  constructor(value: string | null) {
    this.value = value;
  }
}
