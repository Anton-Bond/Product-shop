import { Request, Response } from 'express';

import { Order } from '../models/order';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

export const getAll = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'email name');
    res.status(200).json(orders);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

// add to cart product's id and count it
const addToCart = async (userId: string, productId: string, count: number) => {
  // if cart exit product
  const user = await Cart.findOne({userId});
  if (user) {
    // create new product list
    const list = user.list;
    const idx = list.findIndex(item => item.productId.toString() === productId);
    if (idx >= 0) {
      // increase count of product
      list[idx].count += count;
    } else {
      // if product isn't exist in user cart, add to cart
      list.push(
        {
          count,
          productId
        }
      )
    }
    await Cart.findByIdAndUpdate(user._id, {list});
  } else {
    // add new user cart, if he isn't exist before
    const cart = new Cart({
      userId,
      list: [
        {
          count,
          productId
        }
      ]
    });
    await cart.save();
  }
}

export const addById = async (req: Request, res: Response) => {
    const products = await Product.find();
    const product = products.find(p => p._id.toString() === req.body.productId);
    if (product) {
      try {
        await addToCart(req.body.userId, product._id.toString(), req.body.count);
        res.status(201).json(product);
        // tslint:disable-next-line:no-console
        console.log(`Продукт "${product.name}" добавлен в корзину`);
      } catch (e) {
        res.status(404).send(e.message);
      }
    } else {
      // tslint:disable-next-line:no-console
      console.log(`Не найден продукт с таким кодом товара`);
      res.status(204).json({});
    }
  }

export const getById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'email name');
    res.status(200).json(order);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const removeById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findByIdAndRemove(req.params.id);
    res.status(200).json(order);
  } catch (e) {
    res.status(404).send(e.message);
  }
}
