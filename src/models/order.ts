import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type OrderDocument = mongoose.Document & {
  date: Date,
  orderNum: number,
  list: [
    {
      name: string,
      count: number,
      price: number
    }
  ],
  userId: string
};

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  orderNum: Number,
  list: [
    {
      name: String,
      count: Number,
      price: Number
    }
  ],
  userId: {
    ref: 'User',
    type: Schema.Types.ObjectId
  }
});

export const Order = mongoose.model<OrderDocument>('Order', orderSchema);