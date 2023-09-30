import Post from "../db/models/post";
import { Op } from "sequelize";

export default class PostRepository {
  createPost = async (title, content, createdAt) => {
    return await Post.create({ title, content, createdAt });
  };

  getAllPost = async () => {
    return await Post.findAll();
  };

  getOnePost = async (id) => {
    return await Post.findOne({ where: { id } });
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

  getDateSearch = async (startDate, endDate) => {
    return await Post.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
    });
  };

  deletePost = async (id) => {
    return await Post.destroy({ where: { id } });
  };
}
