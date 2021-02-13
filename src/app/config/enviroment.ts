export const enviroment = {
  port: process.env.PORT || 3000,
  mailer: {
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASSWORD,
    },
  },
};
