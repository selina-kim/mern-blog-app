import { cleanEnv } from "envalid";
import { num, port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  PORT: port(),
  MONGO_URL: str(),
  JWT_SECRET: str(),
  JWT_EXPIRES_IN: num(),
  CLIENT_URL: str(),
});
