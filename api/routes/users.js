import { Router } from 'express';
import { validateRegister, validateLogin } from '../helpers/validateUser';
import { getUsers, registerUser, loginUser } from '../controllers/auth';
const router = new Router();

router.get('/users', getUsers);
router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;