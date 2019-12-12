import { IUserData } from "../Routes/User/types";
import jwt from "jsonwebtoken";

export const createToken = (user: IUserData, secret: string) => {
  const expiresIn = 60 * 60; // an hour
  const dataStoredInToken = {
    id: user.id,
    email: user.email
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn })
  };
};
