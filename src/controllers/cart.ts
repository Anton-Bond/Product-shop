import { Request, Response } from 'express';

import { Cart } from '../models/cart';
import { Order } from '../models/order';

export const getByUserId = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({userId: req.params.id})
      .select('list')
      .populate('list.productId', 'prodCode name price');
    res.status(200).json(cart.list);
  } catch (e) {
    res.status(200).json(null);
  }
};

// delete one count of product from user cart by id
const deleteProductFromCart = async (userId: string, prodId: string) => {
  const userCart = await Cart.findOne({userId});
  const list = userCart.list;
  const idx = list.findIndex(item => item.productId.toString() === prodId);
  const product = list[idx];
  // change product count
  if (list[idx].count > 1) {
    // decrease count of product
    list[idx].count--;
  } else {
    // delete if count === 1
    list.splice(idx, 1)
  }
  // update cart list of user
  await Cart.findByIdAndUpdate(userCart._id, {list});
  // return product to app for response
  return product;
}

// delete product from cart by id from cart page
export const removeProd = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId.toString();
    const prodId = req.query.prodId.toString();
    const product = await deleteProductFromCart(userId, prodId);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const removeById = async (req: Request, res: Response) => {
  try {
    await Cart.deleteOne({ userId: req.params.id });
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