import express from 'express'
import { loginUser, verificarToken, logoutUser}from '../controllers/authController.js'
import { validarLogin } from '../middlewares/validation.js';
import { verificarAuth } from '../middlewares/authValidation.js';
import { loginLimiter } from '../middlewares/rateLimit.js';

const router = express.Router()

router.post('/login', loginLimiter, validarLogin, loginUser);
router.get('/verify', verificarAuth, verificarToken);
router.post('/logout', verificarAuth, logoutUser)

export default router;