import express from 'express';
import CategoryController from './app/controllers/CategoryController';

const ContactController = require('./app/controllers/ContactController');

export const router = express.Router();

router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.delete('/contacts/:id', ContactController.delete);
router.post('/contacts', ContactController.store);
router.put('/contacts/:id', ContactController.update);

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
