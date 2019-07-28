import { Router } from 'express';
import {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost
} from '../controllers/posts';
const router = new Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', addPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;