import path from "path";

export const storage = {
  path: process.env.STORAGEPATH || path.join(__dirname, "../../../storage"),
};
