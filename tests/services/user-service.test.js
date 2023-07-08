import UserRepository from "../../src/repository/user-repository";
import UserService from "../../src/servies/user-service";

// Mock the UserRepository
jest.mock("../../src/repository/user-repository");

describe("signup", () => {
  it("should create a new user and return it", async () => {
    // Arrange
    const data = { name: "Santosh", email: "admin@gmail.com" };
    const createdUser = { id: 1, name: "Santosh", email: "admin@gmail.com" };
    const userRepositoryMock = {
      create: jest.fn().mockResolvedValue(createdUser),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act
    const result = await userService.signup(data);

    // Assert
    expect(result).toEqual(createdUser);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(data);
  });

  it("should throw an error if user creation fails", async () => {
    // Arrange
    const data = { name: "Santosh", email: "admin@gmail.com" };
    const error = new Error("Failed to create user");
    const userRepositoryMock = {
      create: jest.fn().mockRejectedValue(error),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act & Assert
    await expect(userService.signup(data)).rejects.toThrowError(error);
    expect(userRepositoryMock.create).toHaveBeenCalledWith(data);
  });
});

describe("getUserByEmail", () => {
  it("should return the user with the given email", async () => {
    // Arrange
    const email = "admin@gmail.com";
    const user = { id: 1, name: "Santosh", email: "admin@gmail.com" };
    const userRepositoryMock = {
      findBy: jest.fn().mockResolvedValue(user),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act
    const result = await userService.getUserByEmail(email);

    // Assert
    expect(result).toEqual(user);
    expect(userRepositoryMock.findBy).toHaveBeenCalledWith({ email });
  });

  it("should throw an error if user retrieval fails", async () => {
    // Arrange
    const email = "admin@gmail.com";
    const error = new Error("Failed to retrieve user");
    const userRepositoryMock = {
      findBy: jest.fn().mockRejectedValue(error),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act & Assert
    await expect(userService.getUserByEmail(email)).rejects.toThrowError(error);
    expect(userRepositoryMock.findBy).toHaveBeenCalledWith({ email });
  });
});

describe("signin", () => {
  it("should return a token if user authentication is successful", async () => {
    // Arrange
    const data = { email: "admin@gmail.com", password: "password" };
    const user = {
      id: 1,
      name: "Santosh",
      email: "admin@gmail.com",
      comparePassword: jest.fn().mockReturnValue(true),
      genJWT: jest.fn().mockReturnValue("token"),
    };
    const userRepositoryMock = {
      findBy: jest.fn().mockResolvedValue(user),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act
    const result = await userService.signin(data);

    // Assert
    expect(result).toEqual("token");
    expect(userRepositoryMock.findBy).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(user.comparePassword).toHaveBeenCalledWith(data.password);
    expect(user.genJWT).toHaveBeenCalled();
  });

  it("should throw an error if no user is found", async () => {
    // Arrange
    const data = { email: "admin@gmail.com", password: "password" };
    const userRepositoryMock = {
      findBy: jest.fn().mockResolvedValue(null),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act & Assert
    await expect(userService.signin(data)).rejects.toEqual({
      message: "no user found",
      success: false,
    });
    expect(userRepositoryMock.findBy).toHaveBeenCalledWith({
      email: data.email,
    });
  });

  it("should throw an error if the password is incorrect", async () => {
    // Arrange
    const data = { email: "admin@gmail.com", password: "password" };
    const user = {
      id: 1,
      name: "Santosh",
      email: "admin@gmail.com",
      comparePassword: jest.fn().mockReturnValue(false),
    };
    const userRepositoryMock = {
      findBy: jest.fn().mockResolvedValue(user),
    };
    UserRepository.mockImplementation(() => userRepositoryMock);
    const userService = new UserService();

    // Act & Assert
    await expect(userService.signin(data)).rejects.toEqual({
      message: "incorrect password",
      success: false,
    });
    expect(userRepositoryMock.findBy).toHaveBeenCalledWith({
      email: data.email,
    });
    expect(user.comparePassword).toHaveBeenCalledWith(data.password);
  });
});
