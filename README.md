# APIs
- Sign up localhost:3002/api/v1/signup - POST request object:
  ```
  {
      email: <email>,
      password: <password>,
      name: <username>
    }
  ```


  success response object:
    ```
    {
        "success": true,
        "message": "Successfully created a new user",
        "data": {
            "email": "santu@gmail.com",
            "password": "$2b$09$SoD6Fz4Ur1AQsJ5sfpERq.z3iPXDFEUyaPRl9MxgOHXC5ffnVXMjm",
            "name": "Santosh",
            "_id": "6548dcea67a9a82bc38f529b",
            "createdAt": "2023-11-06T12:32:42.594Z",
            "updatedAt": "2023-11-06T12:32:42.594Z",
            "__v": 0
        },
        "err": {}
    }
    ```
  
  failure response object: 
  ```
  {
    "message": "Something went wrong",
    "data": {},
    "success": false,
    "err": {
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "santu@gmail.com"
        }
    }
  }

  ```


- Sing in localhost:3002/api/v1/login - POST request object:


    ```
  {
      email: <email>,
      password: <password>,
      name: <username>
  }
  ```

  success response object:

  ```
  {
    "success": true,
    "message": "Successfully logged in",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NDhkY2VhNjdhOWE4MmJjMzhmNTI5YiIsImVtYWlsIjoic2FudHVAZ21haWwuY29tIiwiaWF0IjoxNjk5Mjc0Nzc4LCJleHAiOjE2OTkyNzgzNzh9.coFvKeYXnaEu2vE6naRsp-0SxLQv-m2OUznZIYlmwnI",
    "err": {}
  } 
  ```

  failure response object:

  ```
  {
    "message": "Something went wrong controller",
    "data": {},
    "success": false,
    "err": {
        "message": "incorrect password",
        "success": false
    }
  }
  ```

- Get tweet by id: localhost:3002/api/v1/tweets/6413683b87edac2ef1994f6e - Get
  - Success response object
  ```
  {
    "success": true,
    "message": "Successfully fetched a tweet",
    "data": {
        "_id": "6413683b87edac2ef1994f6e",
        "content": "i am #excited and going to do #fun, #newjob #lovelife",
        "hashtags": [],
        "createdAt": "2023-03-16T19:04:27.792Z",
        "updatedAt": "2023-03-16T19:04:27.792Z",
        "__v": 0
    },
    "err": {}
  }
  ```



# Requirements

- User should be able to create a post
  - [The post/tweet cannot be more than 250 chars]
  - [Every post/tweet will be having support for image upload]

- Any post should be visiable to all those users who follow the author
- Anyone who follows you comment on a post/tweet
- Anyone who follows you can comment on a post/tweet
- We can comment on a comment
- We can like any comment also
- Retweeting

- User profile:
  - Name
  - Follower conut
  - Bio
  - Last 10 tweets from the user

- Pagination on tweets
- User auth

- Every tweet might be having a hashtag

# **Project Explanation**

Twitter backend using the monolithic architecture pattern, incorporating features such as comments, hashtags, top trending tweets, likes, tweets, user authentication, and image upload via AWS S3 bucket:

1. User Authentication: Implement a user authentication system where users can sign up, log in, and manage their account settings. This includes features like password hashing and secure session management.

2. Tweeting: Enable users to create and post tweets. Each tweet can have text content and may optionally include images. Implement functionality for creating, editing, and deleting tweets.

3. Commenting: Allow users to comment on tweets. Each tweet can have multiple comments, and users can view and manage comments associated with their tweets.

4. Hashtags: Implement hashtag functionality to categorize tweets. Users can add hashtags to their tweets, and the system should provide the ability to search and discover tweets based on specific hashtags.

5. Likes: Enable users to like tweets. Implement the ability for users to like and unlike tweets, and display the total number of likes a tweet has received.

6. Top Trending Tweets: Develop a mechanism to identify and display the top trending tweets. Implement algorithms to track tweet popularity based on likes, retweets, and comments.

7. Image Upload via AWS S3: Integrate AWS S3 (Simple Storage Service) to handle image uploads for tweets. When a user includes an image in a tweet, the image should be uploaded to an S3 bucket, and the tweet should reference the image URL.

8. Scalability and Performance: Design the system to handle a large number of users, tweets, and interactions efficiently. Optimize database queries, implement caching mechanisms, and use indexing where necessary.

9. Security: Ensure the system is secure by implementing appropriate measures such as input validation, authentication, authorization, and protection against common web vulnerabilities (e.g., cross-site scripting, SQL injection).

10. Error Handling and Logging: Implement robust error handling mechanisms and log relevant information for troubleshooting and system monitoring purposes.

11. Monolithic Architecture: Develop the backend using the monolithic architecture pattern, where all the features are implemented within a single, integrated application.

By cloning the Twitter backend and incorporating these features, you are building a comprehensive social media platform with user authentication, tweet creation and management, comments, hashtags, likes, top trending tweets, and image upload capabilities. This project requires integrating AWS S3 for image storage, ensuring scalability, performance, security, and robust error handling.
