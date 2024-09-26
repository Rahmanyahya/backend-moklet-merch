import { login } from "../repository/login.repository";

const loginService = async (username: string) => {
  return await login(username);
};

export { loginService };
