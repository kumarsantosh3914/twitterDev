// const LikeRepository = require('./LikeRepository');
// const TweetRepository = require('./TweetRepository');
// const LikeService = require('./LikeService');
import LikeRepository from "../../src/repository/like-repository.js";
import TweetRepository from "../../src/repository/tweet-repository.js";
import LikeService from "../../src/servies/like-service.js";

// Mock the LikeRepository and TweetRepository
jest.mock("../../src/repository/like-repository.js");
jest.mock("../../src/repository/tweet-repository.js");

describe("LikeService", () => {
  describe("toggleLike", () => {
    it("should toggle the like on a tweet", async () => {
      // Arrange
      const modelId = 1;
      const modelType = "Tweet";
      const userId = 1;
      const likeable = { id: modelId, likes: [] };

      const likeRepositoryMock = {
        findByUserAndLikeable: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: 1 }),
      };
      const tweetRepositoryMock = {
        find: jest.fn().mockResolvedValue(likeable),
      };

      LikeRepository.mockImplementation(() => likeRepositoryMock);
      TweetRepository.mockImplementation(() => tweetRepositoryMock);
      const likeService = new LikeService();

      // Act
      const result = await likeService.toggleLike(modelId, modelType, userId);

      // Assert
      expect(result).toBe(true);
      expect(tweetRepositoryMock.find).toHaveBeenCalledWith(modelId);
      expect(likeRepositoryMock.findByUserAndLikeable).toHaveBeenCalledWith({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      expect(likeable.likes).toContainEqual({ id: 1 });
      expect(tweetRepositoryMock.save).toHaveBeenCalled();
      expect(likeRepositoryMock.create).toHaveBeenCalledWith({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
    });

    it("should remove the like on a tweet", async () => {
      // Arrange
      const modelId = 1;
      const modelType = "Tweet";
      const userId = 1;
      const likeable = { id: modelId, likes: [{ id: 1 }] };

      const likeRepositoryMock = {
        findByUserAndLikeable: jest.fn().mockResolvedValue({ id: 1 }),
      };
      const tweetRepositoryMock = {
        find: jest.fn().mockResolvedValue(likeable),
        save: jest.fn(),
      };

      LikeRepository.mockImplementation(() => likeRepositoryMock);
      TweetRepository.mockImplementation(() => tweetRepositoryMock);
      const likeService = new LikeService();

      // Act
      const result = await likeService.toggleLike(modelId, modelType, userId);

      // Assert
      expect(result).toBe(false);
      expect(tweetRepositoryMock.find).toHaveBeenCalledWith(modelId);
      expect(likeRepositoryMock.findByUserAndLikeable).toHaveBeenCalledWith({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      expect(likeable.likes).toHaveLength(0);
      //   expect(tweetRepositoryMock.save).toHaveBeenCalled();
      expect(likeRepositoryMock.remove).toHaveBeenCalled();
    });

    it("should throw an error for unknown model type", async () => {
      // Arrange
      const modelId = 1;
      const modelType = "Unknown";
      const userId = 1;

      const likeService = new LikeService();

      // Act & Assert
      await expect(
        likeService.toggleLike(modelId, modelType, userId)
      ).rejects.toThrowError("unknown model type");
    });
  });
});
