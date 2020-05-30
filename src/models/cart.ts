import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type CartDocument = mongoose.Document & {
  count: number,
  productId: string
};

const cartSchema = new mongoose.Schema({
  count: Number,
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema);
