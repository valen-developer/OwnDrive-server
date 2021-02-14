import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserMongo = new Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: false,
  },
  validated: {
    type: Boolean,
    require: true,
  },
});

export default mongoose.model("user", UserMongo);
