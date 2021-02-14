import { Http4xxException } from "../../../../../context/shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../../../context/shared/domain/exceptions/NullValue.exception";
import { UserEmail } from "../../../../../context/Users/domain/valueObjects/email.valueObject";

describe("UserEmail ValueObject", () => {
  describe("when it´s not a valid email", () => {
    test("when it´s a null email should throw an Null Exception", () => {
      const nullEmail = "";

      expect(() => {
        new UserEmail(nullEmail);
      }).toThrow(NullValueException);
    });

    test("when its format is not a valid format should be a Http exception", () => {
      const invalidEmail = "invalidemail.com";

      expect(() => {
        new UserEmail(invalidEmail);
      }).toThrow(Http4xxException);
    });
  });

  describe("when it´s a valid email", () => {
    test("value property should be equal to passed param", () => {
      const validEmail = "valid@email.com";

      const userEmail = new UserEmail(validEmail);

      expect(userEmail.value).toEqual(validEmail);
    });
  });
});
