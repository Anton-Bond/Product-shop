import express from 'express';
import passport from 'passport';

import * as controller from '../controllers/products';

export const productsRoutes = express.Router();

productsRoutes.get('/', passport.authenticate('jwt', {session: false}),controller.getAll);
productsRoutes.post('/', passport.authenticate('jwt', {session: false}),controller.addById);
