import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
);

const UserModel = mongoose.model('User', userSchema, 'users');

export default UserModel;
