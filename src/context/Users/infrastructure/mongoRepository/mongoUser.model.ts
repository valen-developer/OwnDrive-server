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
  image: {
    type: String,
    required: false,
  },
});

export default mongoose.model("user", UserMongo);
