import { generateRandomPassword } from "../../../../app/utils/randomPasswordGenerator";
import { Http4xxException } from "../../../../context/shared/domain/exceptions/Http4xx.exception";
import { UserFinder } from "../../../../context/Users/application/findUser";
import { UpdateUser } from "../../../../context/Users/application/updateUser";
import { UserCreator } from "../../../../context/Users/application/userCreator";
import { User } from "../../../../context/Users/domain/user.model";
import { MockUserRepository } from "../infrastructure/MockUserRepository";

const mockUserRepository = new MockUserRepository();
const uuidUserIn = "random uuid";

describe("User Creator", () => {
  test("valid user shouldn´t throw any exception", async () => {
    const create = async () => {
      const userCreator = new UserCreator(mockUserRepository);

      await userCreator.create({
        email: "valid@email.com",
        image: null,
        name: "validName",
        password: generateRandomPassword(),
        uuid: uuidUserIn,
        validated: false,
      });
    };

    return expect(create()).resolves.not.toThrow();
  });

  test("invalid user should throw a http exception", async () => {
    const create = async () => {
      const userCreator = new UserCreator(mockUserRepository);
      await userCreator.create({
        email: "invalidemail.com",
        image: null,
        name: "validName",
        password: "123456",
        uuid: "random uuid",
        validated: false,
      });
    };

    await expect(create()).rejects.toBeInstanceOf(Http4xxException);
  });
});

describe("Update User", () => {
  describe("when user doesn´t exist", () => {
    test("should throw an http exception", async () => {
      const update = async () => {
        const userUpdater = new UpdateUser(mockUserRepository);
        await userUpdater.update("not valid uuid", { name: "new name" });
      };

      await expect(update()).rejects.toBeInstanceOf(Http4xxException);
    });
  });

  describe("when user is in reporitoy", () => {
    test("updated propreties should be equal to passed properties", async () => {
      const updatedName = "updated name";
      async function update() {
        const uuid = "12345uuid";

        const userCreator = new UserCreator(mockUserRepository);
        await userCreator.create({
          email: "validemail@mail.com",
          image: null,
          name: "valid user",
          password: generateRandomPassword(),
          uuid,
          validated: false,
        });

        const userUpdater = new UpdateUser(mockUserRepository);
        return await userUpdater.update(uuid, { name: updatedName });
      }

      await expect(update()).resolves.not.toThrow();

      const user = await update();

      expect(user.name).toBe(updatedName);
    });
  });
});

describe("User Finder", () => {
  describe("when find a user which not exist", () => {
    test("should throw null exception", async () => {
      async function finder() {
        const userFinder = new UserFinder(mockUserRepository);
        const userDB = await userFinder.byUuid("not uuid");
        return userDB;
      }

      await expect(finder()).rejects.toBeInstanceOf(Http4xxException);
    });
  });

  describe("when user exits", () => {
    test("should return valid user", async () => {
      async function finder(): Promise<User | null> {
        const userFinder = new UserFinder(mockUserRepository);
        return await userFinder.byUuid(uuidUserIn);
      }

      await expect(finder()).resolves.not.toThrow();

      const user = await finder();

      expect(user).toBeInstanceOf(User);
    });
  });
});
