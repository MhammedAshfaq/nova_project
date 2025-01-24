import { Request, Response } from "express";
import { User } from "../entities/User";
import AppDataSource from "../db/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUserSchema, loginUserSchema } from "../utility/inputValidation";
dotenv.config();

const userRepo = AppDataSource.getRepository(User);
export const userRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const { error, value } = createUserSchema.validate(req.body); // input validation
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const existUser = await userRepo.findOneBy({ email: email });

  if (existUser) {
    res.status(400).json({
      success: false,
      error: "User already exist",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = userRepo.create({
    username,
    password: hashPassword,
    email,
  });
  await userRepo.save(newUser);

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
  });
};

export const userlogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { error, value } = loginUserSchema.validate(req.body); // input validation
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const findUser = await userRepo.findOneBy({ email: email });
  if (!findUser) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  if (!findUser?.password) {
    throw new Error("Password not found");
  }

  const isPassword = bcrypt.compareSync(
    password,
    findUser && findUser.password
  );

  if (!isPassword) {
    res.status(400).json({
      success: false,
      message: "Password not match",
    });
  }

  const token = jwt.sign({ id: findUser.id, email: findUser.email }, "SECRET", {
    expiresIn: "1h",
  });
  const { password: _, ...userWithOutPass } = findUser;
  res.status(200).json({
    success: true,
    message: "Login successfully",
    user: userWithOutPass,
    token: token,
  });
};
