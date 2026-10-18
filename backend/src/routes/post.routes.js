import { Router } from "express";
import { createaPost, deletePost, getPosts, updatePost} from "../controllers/post.controller.js";

const router = Router();

router.route('/create').post(createaPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);



export default router;
