import PostService from "../services/post.services";

export default class PostController {
  postService = new PostService();

  createPost = async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;

    const { status, message } = await this.postService.createPost(title, content);

    return res.status(status).json(message);
  };

  getAllPost = async (req, res) => {
    const { status, message } = await this.postService.getAllPost();

    return res.status(status).json(message);
  };

  getOnePost = async (req, res) => {
    const { id } = req.params;

    const { status, message } = await this.postService.getOnePost(id);

    return res.status(status).json(message);
  };

  getSearchPost = async (req, res) => {
    const { target, content } = req.body;

    const { status, message } = await this.postService.getSearchPost(target, content);

    return res.status(status).json(message);
  };
}
