import { Request, Response } from "express";

import { Product } from "../models/product";

export const getAll = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const getById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const addNewProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product({
      prodCode: req.body.prodCode,
      name: req.body.name,
      price: req.body.price
    });
    await product.save()
    res.status(201).json(product)
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const update = async (req: Request, res: Response) => {
   try {
    const product = new Product({
      prodCode: req.body.prodCode,
      name: req.body.name,
      price: req.body.price
    });
    await Product.findByIdAndUpdate(req.params.id,
      {
        prodCode: req.body.prodCode,
        name: req.body.name,
        price: req.body.price
      })
    res.status(200).json(product)
  } catch (e) {
    res.status(404).send(e.message);
  }
}

export const removeById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(404).send(e.message);
  }
}