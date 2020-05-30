import express from 'express';

import * as controller from '../controllers/products';

export const productsRoutes = express.Router();

productsRoutes.get('/', controller.getAll);
productsRoutes.post('/', controller.addById);
