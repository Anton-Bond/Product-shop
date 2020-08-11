import express from 'express';
import passport from 'passport';

import * as controller from '../controllers/products';

export const productsRoutes = express.Router();

productsRoutes.get('/', passport.authenticate('jwt', {session: false}),controller.getAll);
productsRoutes.get('/:id', passport.authenticate('jwt', {session: false}),controller.getById);
productsRoutes.post('/', passport.authenticate('jwt', {session: false}),controller.addNewProduct);
productsRoutes.post('/:id', passport.authenticate('jwt', {session: false}), controller.update)
productsRoutes.delete('/:id', passport.authenticate('jwt', {session: false}),controller.removeById);
