import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
  email: string,
  name: string,
  password: string
};

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  password: String
});

export const User = mongoose.model<UserDocument>('User', userSchema);