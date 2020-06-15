import { Request, Response } from 'express';

import { Cart } from '../models/cart';
import { Order } from '../models/order';

export const getAll = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.find()
      .populate('productId', 'prodCode name price');
    res.status(200).json(cart);
  } catch (e) {
    res.status(404).send(e.message);
  }
};

// delete one count of product from cart by id
const deleteProductFromCart = async (id: string) => {
  const product = await Cart.findById(id).populate('productId', 'name');;
  if (product.count > 1) {
    // update count if more than one
    await Cart.findByIdAndUpdate(product._id, {count: --product.count});
  } else {
    // delete if count === 1
    await Cart.findByIdAndDelete(id);
  }
  return product;
}

// delete product from cart by id from cart page
export const remove = async (req: Request, res: Response) => {
  try {
    const product = await deleteProductFromCart(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const removeAll = async (req: Request, res: Response) => {
  try {
    await Cart.remove({});
    res.status(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

// add user order to DB
export const createOrder = async (req: Request, res: Response) => {
  try {
    // get last number of order
    const lastOrder = await Order
      .findOne({user: req.body.id})
      .sort({date: -1})

    const maxOrder = lastOrder ? lastOrder.orderNum : 0

    const order = await new Order({
      list: req.body.list,
      userId: req.body.userId,
      orderNum: maxOrder + 1
    }).save()

    res.status(201).json(order)
  } catch (e) {
    res.status(404).send(e.message);
  }
}