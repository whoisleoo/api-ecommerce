import express from 'express';
import { buscarProduto, criarProduto, deleteProduto, listarProdutos, updateProduto } from '../controllers/ProductController.js';
import { validarID, validarProduto } from '../middlewares/validation.js';
import { verificarAdmin, verificarAuth } from '../middlewares/authValidation.js';
import { adminLimiter } from '../middlewares/rateLimit.js';

const router = express.Router();

router.get('/products', listarProdutos);
router.get('/products/:id', validarID, buscarProduto);
router.post('/products', verificarAuth, verificarAdmin, adminLimiter, validarProduto, criarProduto);
router.put('/products/:id', validarID, verificarAuth, verificarAdmin, adminLimiter, updateProduto);
router.delete('/products/:id', validarID, verificarAuth, verificarAdmin, adminLimiter, deleteProduto);


export default router;