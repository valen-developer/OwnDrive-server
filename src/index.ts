import { urlencoded, json } from "express";
import fileupload from "express-fileupload";
import mongoose from "mongoose";
import cors from "cors";

import { Server } from "./app/server";

import { enviroment } from "./app/config/enviroment";
import { router } from "./app/routes/index.routing";

const server = new Server(enviroment.port);

server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

server.app.use(fileupload());

server.app.use(router);

mongoose.connect(
  enviroment.MongoDB.url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err) => {
    console.log(err);
  }
);

server.start();
