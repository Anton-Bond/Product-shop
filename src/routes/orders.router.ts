import express from 'express';
import passport from 'passport';

import * as controller from '../controllers/orders';

export const ordersRoutes = express.Router();

ordersRoutes.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
ordersRoutes.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
ordersRoutes.delete('/:id', passport.authenticate('jwt', {session: false}), controller.removeById);
ordersRoutes.post('/', passport.authenticate('jwt', {session: false}),controller.addById);
