import express from 'express';
import { CarController } from '../controllers';
import { CarValidator } from '../validations';
import { verifyToken, isAdminDummy, isOwnerDummy } from '../middlewares/auth';

const {
  postCarAd, getSingleCarAd, fetchAllCarAds, deleteSingleCarAd, editAdStatus
} = CarController;
const { postAdchecker, findSpecificCarAd } = CarValidator;

export const carRouter = express.Router();


carRouter.post('/car', verifyToken, postAdchecker, postCarAd);
carRouter.get('/car/:id', findSpecificCarAd, getSingleCarAd);
carRouter.get('/car', verifyToken, isAdminDummy, fetchAllCarAds);
carRouter.delete('/car/:id', verifyToken, isAdminDummy, findSpecificCarAd, deleteSingleCarAd);
carRouter.patch('/car/:id/status', verifyToken, isOwnerDummy, findSpecificCarAd, editAdStatus);
