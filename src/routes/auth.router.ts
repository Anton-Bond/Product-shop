import express from 'express';

import * as controller from '../controllers/auth';

export const authRoutes = express.Router();

authRoutes.post('/login', controller.login);
authRoutes.post('/registration', controller.registration);
