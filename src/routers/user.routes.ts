import { Router } from "express";
import {
  userCreateController,
  userDeleteController,
  userListController,
  usersListController,
  userUpdateController,
} from "../controllers/user.controllers";

const userRoutes = Router();

userRoutes.post("", userCreateController);
userRoutes.get("", usersListController);
userRoutes.get("/:id", userListController);
userRoutes.patch("/:id", userUpdateController);
userRoutes.delete("/:id", userDeleteController);

export default userRoutes;
