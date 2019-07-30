import { Router } from 'express';
import {
    getPosts,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    likePost
} from '../controllers/posts';
import { validateCreate, validateUpdate, validatePostId } from '../helpers/validatePost';
const router = new Router();

router.get('/', getPosts);
router.get('/:id', validatePostId, getPostById);
router.post('/', validateCreate, addPost);
router.post('/likes/:id', likePost);
router.put('/:id', validatePostId, validateUpdate, updatePost);
router.delete('/:id', validatePostId, deletePost);

export default router;