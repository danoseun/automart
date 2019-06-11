import express from 'express';
import { CarController } from '../controllers';
import { CarValidator } from '../validations';
import { verifyToken } from '../middlewares/auth';

const { postCarAd, getSingleCarAd } = CarController;
const { postAdchecker, findSpecificCarAd } = CarValidator;

export const carRouter = express.Router();


carRouter.post('/car', verifyToken, postAdchecker, postCarAd);
carRouter.get('/car/:id', findSpecificCarAd, getSingleCarAd);
