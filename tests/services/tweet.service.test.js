import TweetRepository from "../../src/repository/tweet-repository.js";
import HashtagRepository from "../../src/repository/hashtag-repository.js";

import TweetService from "../../src/servies/tweet-service.js";

// Mock the TweetRepository and HashtagRepository
jest.mock("../../src/repository/tweet-repository.js");
jest.mock("../../src/repository/hashtag-repository.js");

describe("create", () => {
  it("should create a new tweet and associated hashtags", async () => {
    // Arrange
    const data = { content: "This is a #test tweet" };
    const tweet = { id: 1, content: "This is a #test tweet" };
    const hashtags = ["test"];
    const alreadyPresentTags = [{ title: "test", tweets: [] }];
    const newTags = [{ title: "newtag", tweets: [1] }];

    // Create mock functions for methods of the repositories
    const tweetRepositoryMock = {
      create: jest.fn().mockResolvedValue(tweet), // Mock the create method to return the created tweet
    };
    const hashtagRepositoryMock = {
      findByName: jest.fn().mockResolvedValue(alreadyPresentTags), // Mock the findByName method to return the already present tags
      bulkCreate: jest.fn(), // Mock the bulkCreate method for the new tags
    };

    // Mock the TweetRepository and HashtagRepository
    TweetRepository.mockImplementation(() => tweetRepositoryMock);
    HashtagRepository.mockImplementation(() => hashtagRepositoryMock);

    // Create an instance of YourClass
    const tweetService = new TweetService();

    // Act
    const result = await tweetService.create(data);

    // Assert
    expect(result).toEqual(tweet); // Check that the result is equal to the created tweet
    expect(hashtagRepositoryMock.findByName).toHaveBeenCalledWith(hashtags); // Check that the findByName method was called with the expected hashtag
    expect(hashtagRepositoryMock.bulkCreate).toHaveBeenCalledWith(newTags); // Check that the bulkCreate method was called with the expected new tags
    expect(tweetRepositoryMock.create).toHaveBeenCalledWith(data); // Check that the create method was called with the expected data
    expect(alreadyPresentTags[0].tweets).toContain(tweet.id); // Check that the created tweet is added to the already present tags
    expect(alreadyPresentTags[0].save).toHaveBeenCalled(); // Check that the save method of the already present tags is called
  });
});
