import { Request, Response } from "express";

import { Product } from "../models/product";
import { Cart } from "../models/cart";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

// add to cart product's id and count it
const addToCart = async (id: string, count: number) => {
  // if cart exit product
  const product = await Cart.findOne({productId: id});
  if (product) {
    // increase count
    await Cart.findByIdAndUpdate(product._id, {count: product.count + count});
  } else {
    // add new product to cart
    const cart = new Cart({
      count,
      productId: id
    });
    await cart.save();
  }
}

export const addById = async (req: Request, res: Response) => {
  const products = await Product.find();
  const product = products.find(p => p._id.toString() === req.body.id);
  if (product) {
    try {
      await addToCart(product._id, req.body.count);
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