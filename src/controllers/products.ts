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
const addToCart = async (id: string) => {
  // if cart exit product
  const product = await Cart.findOne({productId: id});
  if (product) {
    // increase count
    await Cart.findByIdAndUpdate(product._id, {count: ++product.count});
  } else {
    // add new product to cart
    const cart = new Cart({
      count: 1,
      productId: id
    });
    await cart.save();
  }
}

export const addById = async (req: Request, res: Response) => {
  const products = await Product.find();
  const product = products.find(p => p._id.toString() === req.body.id);
  if (product) {
    await addToCart(product._id);
    res.status(201).json(product);
    // tslint:disable-next-line:no-console
    console.log(`Продукт "${product.name}" добавлен в корзину`);
  } else {
    // tslint:disable-next-line:no-console
    console.log(`Не найден продукт с таким кодом товара`);
  }
}