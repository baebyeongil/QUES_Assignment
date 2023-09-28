import PostRepository from "../repositories/post.repositories";
export default class PostService {
  postRepository = new PostRepository();

  createPost = async (title, content) => {
    try {
      if (!title) {
        return {
          status: 400,
          message: "Cannot find title",
        };
      }
      if (!content) {
        return {
          status: 400,
          message: "Cannot find content",
        };
      }
      const post = await this.postRepository.createPost(title, content);
      if (!post) {
        return {
          status: 400,
          message: "Fail Create Post",
        };
      }
      return {
        status: 200,
        message: "Success Create Post",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };

  getAllPost = async () => {
    try {
      const posts = await this.postRepository.getAllPost();
      return {
        status: 200,
        message: posts,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };

  getOnePost = async (id) => {
    try {
      const post = await this.postRepository.getOnePost(id);
      if (!post) {
        return {
          status: 400,
          message: "Fail Get Post",
        };
      }
      return {
        status: 200,
        message: post,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };

  getSearchPost = async (target, content) => {
    try {
      if (!target) {
        return {
          status: 400,
          message: "Cannot find target",
        };
      }
      if (!content) {
        return {
          status: 400,
          message: "Cannot find content",
        };
      }
      let posts;
      if (target === "title") {
        posts = await this.postRepository.getTitleSearch(content);
      } else if (target === "content") {
        posts = await this.postRepository.getContentSearch(content);
      } else {
        return {
          status: 400,
          message: "Target Error",
        };
      }
      return {
        status: 200,
        message: posts,
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };
}
