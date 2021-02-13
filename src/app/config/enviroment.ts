import { secret } from "../../secret";

export const enviroment = {
  port: process.env.PORT || 3000,
  mailer: {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILUSER || "valen7valverde@gmail.com",
      pass: process.env.MAILPASSWORD || secret.mailPassword,
    },
  },
  MongoDB: {
    url: process.env.MONGODBURL || "mongodb://localhost:27017/owndrive",
  },
};
