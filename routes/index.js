import { Router } from "express";
import PostRoute from "./post.routes";
const router = Router();

router.use("/", PostRoute);

export default router;
