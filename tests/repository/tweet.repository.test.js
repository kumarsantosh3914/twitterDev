import TweetRepository from "../../src/repository/tweet-repository.js";
import Tweet from "../../src/models/tweet.js";

jest.mock("../../src/models/tweet.js");

describe("TweetRepository", () => {
  describe("create", () => {
    it("should create a new tweet", async () => {
      // Arrange
      const data = { content: "This is a tweet" };
      const tweet = { id: 1, content: "This is a tweet" };

      Tweet.create.mockResolvedValue(tweet);
      const tweetRepository = new TweetRepository();

      // Act
      const result = await tweetRepository.create(data);

      // Assert
      expect(result).toEqual(tweet);
      expect(Tweet.create).toHaveBeenCalledWith(data);
    });

    it("should log an error if tweet creation fails", async () => {
      // Arrange
      const data = { content: "This is a tweet" };
      const error = new Error("Failed to create tweet");

      Tweet.create.mockRejectedValue(error);
      const tweetRepository = new TweetRepository();

      // Act & Assert
      await expect(tweetRepository.create(data)).rejects.toThrowError(error);
      expect(Tweet.create).toHaveBeenCalledWith(data);
    });
  });

  //   describe("getWithComments", () => {
  //     it("should retrieve a tweet with comments", async () => {
  //       // Arrange
  //       const id = 1;
  //       const tweetWithComments = {
  //         id: 1,
  //         content: "This is a tweet",
  //         comments: [],
  //       };

  //       const findByIdMock = jest.spyOn(Tweet, "findById").mockReturnValue({
  //         populate: jest.fn().mockReturnThis(),
  //         lean: jest.fn().mockResolvedValue(tweetWithComments),
  //       });

  //       const tweetRepository = new TweetRepository();

  //       // Act
  //       const result = await tweetRepository.getWithComments(id);

  //       // Assert
  //       expect(result).toEqual(tweetWithComments);
  //       expect(findByIdMock).toHaveBeenCalledWith(id);

  //       // Clean up
  //       findByIdMock.mockRestore();
  //     });

  //     it("should log an error if tweet retrieval fails", async () => {
  //       // Arrange
  //       const id = 1;
  //       const error = new Error("Failed to retrieve tweet");

  //       const findByIdMock = jest.spyOn(Tweet, "findById").mockReturnValue({
  //         populate: jest.fn().mockReturnThis(),
  //         lean: jest.fn().mockRejectedValue(error),
  //       });

  //       const consoleSpy = jest.spyOn(console, "log").mockImplementation();

  //       const tweetRepository = new TweetRepository();

  //       // Act
  //       const result = await tweetRepository.getWithComments(id);

  //       // Assert
  //       expect(result).toBeUndefined();
  //       expect(findByIdMock).toHaveBeenCalledWith(id);
  //       expect(consoleSpy).toHaveBeenCalledWith(error);

  //       // Clean up
  //       findByIdMock.mockRestore();
  //       consoleSpy.mockRestore();
  //     });
  //   });

  describe("Get all tweet tests", () => {
    test("testing limit for get all", async () => {
      const data = {
        content: "Testing tweet",
      };
      const tweetsArray = [
        { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
        { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
        { ...data, createdAt: "2022-02-12", updatedAt: "2022-02-12" },
      ];
      const findResponse = { tweetsArray };
      findResponse.skip = jest.fn((offset) => findResponse);
      findResponse.limit = jest.fn((limit) =>
        findResponse.tweetsArray.slice(0, limit)
      );
      const spy = jest.spyOn(Tweet, "find").mockImplementation(() => {
        return findResponse;
      });
      const tweetRepository = new TweetRepository();
      const tweets = await tweetRepository.getAll(0, 2);
      expect(spy).toHaveBeenCalled();
      expect(tweets).toHaveLength(2);
    });
  });
});
