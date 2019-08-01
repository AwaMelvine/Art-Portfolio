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
import { authenticate, artistsOnly } from '../helpers/authenticate';
const router = new Router();

router.get('/', getPosts);
router.get('/:id', validatePostId, getPostById);
router.post('/', authenticate, artistsOnly, validateCreate, addPost);
router.post('/likes/:id', authenticate, validatePostId, likePost);
router.put('/:id', authenticate, artistsOnly, validatePostId, validateUpdate, updatePost);
router.delete('/:id', authenticate, artistsOnly, validatePostId, deletePost);

export default router;