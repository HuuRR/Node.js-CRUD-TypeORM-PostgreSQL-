import { Request, Response } from "express";
import {
  userCreateService,
  userDeleteService,
  userListService,
  usersListService,
  userUpdateService,
} from "../services/user.services";

const userCreateController = async (req: Request, res: Response) => {
  try {
    const newUser = await userCreateService(req.body);
    const { password, ...user } = newUser;

    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const usersListController = async (req: Request, res: Response) => {
  try {
    const users = await usersListService();

    return res.status(200).json(users);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const userListController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const findUser = await userListService({ id });
    const { password, ...user } = findUser;

    return res.status(200).json(user);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const userUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password, age } = req.body;

    const updatedUser = await userUpdateService({
      name,
      email,
      password,
      age,
      id,
    });

    const { password: string, ...user } = updatedUser;

    return res.status(200).json({ message: "User updated", user });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

const userDeleteController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userDeleteService({ id });

    if (user === true) {
      return res.status(200).json({ message: "User deleted" });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(404).json({
        error: err.name,
        message: err.message,
      });
    }
  }
};

export {
  userCreateController,
  usersListController,
  userListController,
  userUpdateController,
  userDeleteController,
};
