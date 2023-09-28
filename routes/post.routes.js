import { Router } from "express";
import PostController from "../controllers/post.controllers.js";

const router = Router();

const postController = new PostController();

router.post("/createPost", postController.createPost);

router.get("/getAllPost", postController.getAllPost);

router.get("/getOnePost/:id", postController.getOnePost);

router.get("/getSearchPost", postController.getSearchPost);

export default router;
