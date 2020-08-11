import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type CartDocument = mongoose.Document & {
  list: [
    {
      count: number,
      productId: string
    }
  ],
  user: string
};

const cartSchema = new mongoose.Schema({
  list: [
    {
      count: Number,
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
      }
    }
  ],
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
});

export const Cart = mongoose.model<CartDocument>('Cart', cartSchema);
