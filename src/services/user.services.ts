import { User } from "../entities/user.entity";
import { IUserCreate, IUserId, IUserUpdate } from "../interfaces/user";
import { AppDataSource } from "../data-source";
import * as bcrypt from "bcrypt";

const userCreateService = async ({
  name,
  email,
  password,
  age,
}: IUserCreate) => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find();

  const emailAlreadyRegistered = users.find((user) => user.email === email);

  if (emailAlreadyRegistered) {
    throw new Error("Email already registered");
  }

  const user = new User();
  user.name = name;
  user.email = email;
  user.password = await bcrypt.hash(password, 10);
  user.age = age;
  user.created_at = new Date();
  user.updated_at = new Date();

  userRepository.create(user);
  await userRepository.save(user);

  return user;
};

const usersListService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  return users;
};

const userListService = async ({ id }: IUserId): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const userUpdateService = async ({
  name,
  email,
  password,
  age,
  id,
}: IUserCreate): Promise<IUserUpdate> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });
  if (!user) {
    throw new Error("User not found");
  }

  const users = await userRepository.find();
  const emailAlreadyRegistered = users.find((user) => user.email === email);
  if (emailAlreadyRegistered) {
    throw new Error("Email already registered");
  }

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user.age = age || user.age;
  user.updated_at = new Date();

  await userRepository.save(user);

  return user;
};

const userDeleteService = async ({ id }: IUserId) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw new Error("User not found");
  }

  await userRepository.delete({ id });

  return true;
};

export {
  userCreateService,
  usersListService,
  userListService,
  userUpdateService,
  userDeleteService,
};
