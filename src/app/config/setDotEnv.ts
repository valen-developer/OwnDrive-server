import dotenv from "dotenv";
import path from "path";

export const setDotEnv = () => {
  const result = dotenv.config({ path: path.join(__dirname, "../../../.env") });
};
