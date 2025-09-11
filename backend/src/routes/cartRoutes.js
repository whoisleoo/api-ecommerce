import express from 'express';
import { verificarAdmin, verificarAuth } from '../middlewares/authValidation.js';
import { adicionarProduto, limparCarrinho, removerProduto, updateCarrinho, verCarrinho } from '../controllers/cartController.js';
import { validarCarrinho, validarID } from '../middlewares/validation.js';

const router = express.Router();

router.get('/cart', verificarAuth, verCarrinho );
router.put('/cart/:id', validarID, verificarAuth, updateCarrinho);
router.post('/cart', verificarAuth, validarCarrinho, adicionarProduto);
router.delete('/cart/:id', validarID, verificarAuth, removerProduto);
router.delete('/cart', verificarAuth, limparCarrinho);







export default router;