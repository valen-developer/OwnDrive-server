import { NullValueException } from "../../../../../context/shared/domain/exceptions/NullValue.exception";
import { UserName } from "../../../../../context/Users/domain/valueObjects/name.valueObject";

describe("UserName ValueObject", () => {
  describe("when value it null", () => {
    test("should throw an NullException", () => {
      const nullName = "";

      expect(() => {
        new UserName(nullName);
      }).toThrow(NullValueException);
    });
  });

  describe("when it´s a valid name", () => {
    test("value property should be equal to passed param", () => {
      const validName = "validName";

      const userName = new UserName(validName);

      expect(userName.value).toEqual(validName);
    });
  });
});
