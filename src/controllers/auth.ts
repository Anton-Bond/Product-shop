import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';

export const login = async (req: Request, res: Response) => {
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    // check password, user is exist
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    const isAdmin = req.body.email === 'admin@iba.gomel.by';
    if (passwordResult) {
      // generate token, passwords are match
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id,
        isAdmin
      }, 'secret', {expiresIn: 60 * 60});

      res.status(200).json({
        token: `Bearer ${token}`
      });
    } else {
      // passwords aren't match
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова.'
      });
    }
  } else {
    // user isn't exist, send error
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    });
  }
}

export const registration = async (req: Request, res: Response) => {
  // find user from DB by email
  const candidate = await User.findOne({email: req.body.email});

  if (candidate) {
    // user is exist, send error
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    });
  } else {
    // create new user
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch(e) {
      res.status(404).send(e.message);
    }

  }
}