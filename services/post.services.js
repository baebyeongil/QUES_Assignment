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
      const date = new Date();
      const korDate = await this.korTimeTrans(date);
      const post = await this.postRepository.createPost(title, content, korDate);
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
      if (target !== "title" && target !== "content" && target !== "date") {
        return {
          status: 400,
          message: "Target Error",
        };
      }
      let posts;
      if (target === "title") {
        posts = await this.postRepository.getTitleSearch(content);
      }

      if (target === "content") {
        posts = await this.postRepository.getContentSearch(content);
      }
      if (target === "date") {
        if (!content.startDate && !content.endDate) {
          return {
            status: 400,
            message: "Cannot find date",
          };
        }
        const checkDateForm = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/;
        if (!checkDateForm.test(content.startDate) || !checkDateForm.test(content.endDate)) {
          return {
            status: 400,
            message: "Error DateForm",
          };
        }
        if (content.startDate > content.endDate) {
          return {
            status: 400,
            message: "Start date is greater than end date",
          };
        }

        const start = new Date(content.startDate);
        const end = new Date(content.endDate);

        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          return {
            status: 400,
            message: "Error Date",
          };
        }
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        const startDate = await this.korTimeTrans(start);
        const endDate = await this.korTimeTrans(end);
        posts = await this.postRepository.getDateSearch(startDate, endDate);
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

  deletePost = async (id) => {
    try {
      const result = await this.postRepository.deletePost(id);
      if (!result) {
        return {
          status: 400,
          message: "Fail Delete Post",
        };
      }
      return {
        status: 200,
        message: "Success Delete Post",
      };
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };

  korTimeTrans = async (date) => {
    try {
      const offset = 1000 * 60 * 60 * 9;
      return new Date(date.getTime() + offset);
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };
}
