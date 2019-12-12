import express from "express";
import User from "./model";
import { createToken } from "../../utils/utilFunctions";
import { IUserData } from "./types";
const { SECRET } = process.env;
import auth from "../../Middleware/auth";

class UserRoutes {
  public path = "/user";
  public router = express.Router();
  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(`${this.path}/login`, this.googlelogin);
    this.router.get(`${this.path}/:id`, auth, this.getUser);
    this.router.put(`${this.path}/:id`, auth, this.updateUser);
  }

  public googlelogin = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { email } = request.body;
      const user = await User.forge({ email }).fetch();
      let tokenData;
      if (user) {
        tokenData = createToken(user, SECRET);
        response.status(200).send({ user, tokenData });
      } else {
        const createdUser = (await this.saveUser(request.body)) as IUserData;
        tokenData = createToken(createdUser, SECRET);
        const responseData = { ...createdUser, ...tokenData };
        response.status(200).send({
          success: true,
          message: "Login Successful",
          data: responseData
        });
      }
    } catch (e) {
      response.status(400).send({ error: e });
    }
  };

  public updateUser = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { id } = request.params;
      const { userData } = request.body;
      const updatedUser = await User.forge().updateById(id, userData);
      response
        .status(200)
        .send({
          success: true,
          message: "User updated successfully",
          data: updatedUser
        });
    } catch (e) {
      response.status(400).send({
        success: false,
        message: "Cannot update user",
        description: e
      });
    }
  };

  public getUser = async (
    request: express.Request,
    response: express.Response
  ) => {
    try {
      const { id } = request.params;
      const user = await User.forge().byId(id);
      response
        .status(200)
        .send({ success: true, message: "successfull", data: user[0] });
    } catch (e) {
      response.status(400).send({
        success: false,
        message: "Cannot get user",
        description: e
      });
    }
  };

  private saveUser = (userData: IUserData) => {
    return new Promise((resolve, reject) => {
      User.forge(userData)
        .save()
        .then(u => {
          resolve(u.attributes);
        })
        .catch(e => {
          reject(new Error(e));
        });
    });
  };
}

export default UserRoutes;
