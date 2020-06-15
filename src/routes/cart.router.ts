import express from 'express';

import * as controller from '../controllers/cart';

export const cartRoutes = express.Router();

cartRoutes.get('/', controller.getAll);
cartRoutes.delete('/:id', controller.remove);
cartRoutes.post('/', controller.createOrder);
cartRoutes.delete('/', controller.removeAll);
