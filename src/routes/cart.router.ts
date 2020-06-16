import express from 'express';
import passport from 'passport';

import * as controller from '../controllers/cart';

export const cartRoutes = express.Router();

cartRoutes.get('/', passport.authenticate('jwt', {session: false}),controller.getAll);
cartRoutes.delete('/:id', passport.authenticate('jwt', {session: false}),controller.remove);
cartRoutes.post('/', passport.authenticate('jwt', {session: false}),controller.createOrder);
cartRoutes.delete('/', passport.authenticate('jwt', {session: false}),controller.removeAll);
