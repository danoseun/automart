import express from 'express';
import { CarController } from '../controllers';
import { CarValidator } from '../validations';
import { verifyToken } from '../middlewares/auth';

const { postCarAd } = CarController;
const { postAdchecker } = CarValidator;

export const carRouter = express.Router();


carRouter.post('/car', verifyToken, postAdchecker, postCarAd);
