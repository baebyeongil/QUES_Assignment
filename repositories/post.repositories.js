import Post from "../db/models/post";
import { Op } from "sequelize";

export default class PostRepository {
  createPost = async (title, content) => {
    return await Post.create({ title, content });
  };

  getAllPost = async () => {
    return await Post.findAll();
  };

  getTitleSearch = async (content) => {
    return await Post.findAll({
      where: { title: { [Op.like]: `%${content}%` } },
    });
  };

  getContentSearch = async (content) => {
    return await Post.findAll({
      where: { content: { [Op.like]: `%${content}%` } },
    });
  };
}
