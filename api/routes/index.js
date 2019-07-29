import { Router } from 'express';
import users from './users';
import posts from './posts';
const router = new Router();

router.use('/api', users);
router.use('/api/posts', posts);

export default router;