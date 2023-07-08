import UserRepository from "../../src/repository/user-repository.js";
import User from "../../src/models/user.js";

jest.mock("../../src/models/user.js");

describe("UserRepository", () => {
  describe("findBy", () => {
    it("should find a user by data", async () => {
      // Arrange
      const data = { email: "admin@gmail.com" };
      const user = { id: 1, name: "Santosh", email: "admin@gmail.com" };

      User.findOne.mockResolvedValue(user);
      const userRepository = new UserRepository();

      // Act
      const result = await userRepository.findBy(data);

      // Assert
      expect(result).toEqual(user);
      expect(User.findOne).toHaveBeenCalledWith(data);
    });

    it("should throw an error if user retrieval fails", async () => {
      // Arrange
      const data = { email: "admin@gmail.com" };
      const error = new Error("Failed to retrieve user");

      User.findOne.mockRejectedValue(error);
      const userRepository = new UserRepository();

      // Act & Assert
      await expect(userRepository.findBy(data)).rejects.toThrowError(error);
      expect(User.findOne).toHaveBeenCalledWith(data);
    });
  });
});
