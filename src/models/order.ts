import mongoose from 'mongoose';

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
  userId: number
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
  userId: Number
});

export const Order = mongoose.model<OrderDocument>('Order', orderSchema);