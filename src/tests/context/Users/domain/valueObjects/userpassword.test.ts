import { generateRandomPassword } from "../../../../../app/utils/randomPasswordGenerator";
import { Http4xxException } from "../../../../../context/shared/domain/exceptions/Http4xx.exception";
import { NullValueException } from "../../../../../context/shared/domain/exceptions/NullValue.exception";
import { UserPassword } from "../../../../../context/Users/domain/valueObjects/password.valueObject";

describe("UserPassword ValueObject", () => {
  describe("when password is invalid Password should throw an exception", () => {
    test("null value should throw null exception", () => {
      const nullPassword = "";

      expect(() => {
        new UserPassword(nullPassword);
      }).toThrow(NullValueException);
    });

    test("smaller than 8 chars should throw a http exception", () => {
      const small = "12?As";

      expect(() => {
        new UserPassword(small);
      }).toThrow(Http4xxException);
    });

    test("when don´t have number should throw a http exception", () => {
      const noNumberPassword = "AaBbCc?.¿";

      expect(() => {
        new UserPassword(noNumberPassword);
      }).toThrow(Http4xxException);
    });

    test("when don´t have special chars should throw http exception", () => {
      const notSpecialChars = "12345AaBbCc";

      expect(() => {
        new UserPassword(notSpecialChars);
      }).toThrow(Http4xxException);
    });

    test("when don´t have lower or upper chars", () => {
      const notUpper = "1234abcdf?";
      const notLower = "1234ABCDF?";

      expect(() => {
        new UserPassword(notUpper);
      }).toThrow(Http4xxException);

      expect(() => {
        new UserPassword(notLower);
      }).toThrow(Http4xxException);
    });
  });

  describe("when it´s value password", () => {
    test("value property should be equal to passed param", () => {
      const validPassword = "1234AaBc.";

      expect(() => {
        const userPassword = new UserPassword(validPassword);
        expect(userPassword.value).toEqual(validPassword);
      }).not.toThrow();
    });
  });

  describe("Random password generator", () => {
    test("should return valid password", () => {
      const randomPassword = generateRandomPassword();

      expect(() => {
        const userPassword = new UserPassword(randomPassword);
        expect(userPassword.value).toEqual(randomPassword);
      }).not.toThrow();
    });
  });
});
