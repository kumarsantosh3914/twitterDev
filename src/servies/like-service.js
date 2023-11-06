import { LikeRepository, TweetRepository } from "../repository/index.js";
import Tweet from "../models/tweet.js";

class LikeService {
  constructor() {
    this.likerepository = new LikeRepository();
    this.tweetRepository = new TweetRepository();
  }

  async toggleLike(modelId, modelType, userId) {
    if (modelType == "Tweet") {
      // /api/v1/likes/toggle?id=modelid&type=Tweet
      var likeable = await this.tweetRepository.find(modelId);
    } else if (modelType == "Comment") {
      // TODO
    } else {
      throw new Error("unknown model type");
    }
    const exists = await this.likerepository.findByUserAndLikeable({
      user: userId,
      onModel: modelType,
      likeable: modelId,
    });
    if (exists) {
      likeable.likes.pull(exists.id);
      await likeable.save();
      await exists.remove();
      var isAdded = false;
    } else {
      const newLike = await this.likerepository.create({
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });
      likeable.likes.push(newLike);
      await likeable.save();

      var isAdded = true;
    }
    return isAdded;
  }
}

export default LikeService;
