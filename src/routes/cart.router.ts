import express from 'express';
import passport from 'passport';

import * as controller from '../controllers/cart';

export const cartRoutes = express.Router();

cartRoutes.get('/:id', passport.authenticate('jwt', {session: false}), controller.getByUserId);
cartRoutes.delete('/', passport.authenticate('jwt', {session: false}), controller.removeProd);
cartRoutes.post('/', passport.authenticate('jwt', {session: false}), controller.createOrder);
cartRoutes.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);
