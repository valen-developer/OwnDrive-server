export const enviroment = {
  port: process.env.PORT || 3000,
  mailer: {
    host: process.env.MAILHOST || "",
    port: Number(process.env.MAILPORT || 465),
    secure: true,
    auth: {
      user: process.env.MAILUSER || "",
      pass: process.env.MAILPASSWORD || "",
    },
  },
  MongoDB: {
    url: process.env.MONGODBURL || "mongodb://localhost:27017/owndrive",
  },
  token: {
    seed: process.env.TOKENSEED || "a strong seed",
    expireIn: "5d",
  },
};
