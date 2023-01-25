import express from 'express';

/*
Um controller armazena apenas as regras de negócio da aplicação
O Repository Pattern: Layer (camada) de abstração de acesso ao Data Source
- Ele cuida das regras de implementação

As regras do Repository seguem a mesma nomenclatura para implementar o acesso ao dataSource
*/

const ContactController = require('./app/controllers/ContactController');

export const router = express.Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
