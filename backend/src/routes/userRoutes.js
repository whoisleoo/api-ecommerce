import express from 'express'
import { registrarUser, listarUser, deleteUser, buscarUser } from '../controllers/UserController.js';
import{ validarID, validarProduto, validarRegistro} from '../middlewares/validation.js';
import{ verificarAuth, verificarAdmin, verificarPerm} from '../middlewares/authValidation.js'
import { registerLimiter, adminLimiter } from '../middlewares/rateLimit.js';

const router = express.Router()

router.post('/register', registerLimiter, validarRegistro, registrarUser);
router.get('/users', verificarAuth, verificarAdmin, adminLimiter, listarUser);
router.get('/users/:id', validarID, verificarAuth, verificarPerm, buscarUser);
router.delete('/users/:id', validarID, verificarAuth, verificarPerm, deleteUser);



export default router;