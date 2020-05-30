import mongoose from 'mongoose';

export type ProductDocument = mongoose.Document & {
  prodCode: string,
  name: string,
  price: number
};

const productSchema = new mongoose.Schema({
  prodCode: String,
  name: String,
  price: Number
});

export const Product = mongoose.model<ProductDocument>('Product', productSchema);