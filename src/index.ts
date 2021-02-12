import { urlencoded, json } from "express";
import cors from "cors";

import { Server } from "./app/server";

import { enviroment } from "./app/config/enviroment";

const server = new Server(enviroment.port);

server.app.use(urlencoded({ extended: false }));
server.app.use(json());
server.app.use(cors());

server.start();
