import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Display a first name',
  },
  email: {
    type: String,
  },
  picture: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: new Date().toISOString(),
  },
  updatedOn: {
    type: Date,
    default: new Date().toISOString(),
  },
  lastLogin: {
    type: Date,
    default: new Date().toISOString(),
  },
  notificationToken: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: true,
  },
});

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  },
});
export const UserModel = mongoose.model('Users', UserSchema);
