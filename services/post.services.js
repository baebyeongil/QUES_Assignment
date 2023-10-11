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
      const offset = 1000 * 60 * 60 * 9;
      let date = new Date();
      date = new Date(date.getTime() + offset);
      const post = await this.postRepository.createPost(title, content, date);
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

      if (!content.startDate || !content.endDate) {
        return {
          status: 400,
          message: "Cannot find date",
        };
      }

      const dateResult = await this.checkDate(content);
      if (dateResult !== true) {
        return {
          status: 400,
          message: "Error DateForm",
        };
      }

      const start = new Date(content.startDate);
      const end = new Date(content.endDate);
      end.setHours(23, 59, 59, 999);

      posts = await this.postRepository.getDateSearch(start, end);

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

  checkDate = async (content) => {
    try {
      const keys = Object.values(content);
      const checkDateForm = /[0-9]{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
      for (const i of keys) {
        if (!checkDateForm.test(i)) {
          return false;
        }
        const date = i.split("-");
        const y = Number(date[0]);
        const m = Number(date[1]);
        const d = Number(date[2]);

        if (d === 31 && ![1, 3, 5, 7, 8, 10, 12].includes(m)) {
          return false;
        }
        if (m === 2 && (d > 29 || (d === 29 && (y % 4 !== 0 || (y % 100 === 0 && y % 400 !== 0))))) {
          return false;
        }

        const changeDate = new Date(date);
        if (isNaN(changeDate.getTime())) {
          return false;
        }
      }

      const start = new Date(content.startDate);
      const end = new Date(content.endDate);
      if (start > end) {
        return false;
      }
      return true;
    } catch (err) {
      console.log(err);
      return {
        status: 500,
        message: "Server Error",
      };
    }
  };
}
