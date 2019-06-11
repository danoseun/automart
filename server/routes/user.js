import express from 'express';
import { UserController } from '../controllers';
import { UserValidator } from '../validations';

const { register } = UserController;
const { registerCheck } = UserValidator;

export const userRouter = express.Router();

userRouter.post('/auth/register', registerCheck, register);
