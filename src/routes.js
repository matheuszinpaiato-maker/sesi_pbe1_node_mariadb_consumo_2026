const express = require('express');
const router = express.Router();
const usuarioController = require('./controllers/usuario');
const consumoController = require('./controllers/consumo');

router.get('/usuario', usuarioController.listar);
router.post('/usuario', usuarioController.criar);
router.put('/usuario/:id', usuarioController.atualizar);
router.delete('/usuario/:id', usuarioController.deletar);

router.get('/consumo', consumoController.listar);
router.post('/consumo', consumoController.criar);
router.put('/consumo/:id', consumoController.atualizar);
router.delete('/consumo/:id', consumoController.deletar);

module.exports = router;