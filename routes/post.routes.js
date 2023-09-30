import { Router } from "express";
import PostController from "../controllers/post.controllers.js";

const router = Router();

const postController = new PostController();

router.post("/post", postController.createPost);

router.get("/posts", postController.getAllPost);

router.get("/posts/:id", postController.getOnePost);

router.get("/searchPosts", postController.getSearchPost);

router.delete("/posts/:id", postController.deletePost);

export default router;
