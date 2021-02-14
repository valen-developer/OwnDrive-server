import { UserPassword } from "../../context/Users/domain/valueObjects/password.valueObject";

export const generateRandomPassword = () => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const specialCharacters = "!@?¿/.";

  const diccionary = [upper, lower, digits, specialCharacters];

  const length = Math.floor(Math.random() * 12) + 8;
  let password = "";

  while (!UserPassword.isValidPassword(password)) {
    for (let i = 0; i < length; i++) {
      const selector = Math.floor(Math.random() * diccionary.length);
      const randomChar = Math.floor(
        Math.random() * diccionary[selector].length
      );

      password += diccionary[selector].charAt(randomChar);
    }
  }

  return password;
};
