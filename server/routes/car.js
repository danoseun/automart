/* eslint-disable max-len */
import express from 'express';
import { CarController } from '../controllers';
import { CarValidator } from '../validations';
import { verifyToken, isAdmin } from '../middlewares/auth';

const {
  // eslint-disable-next-line no-unused-vars
  postCarAd, getSingleCarAd, fetchAllCarAds, fetchAllUserAds, deleteSingleCarAd, editAdStatus, editAdPrice, statusSearch, statusPriceSearch, statusNewStateSearch, statusUsedStateSearch, statusManufacturerSearch, bodyTypeSearch
} = CarController;
const { postAdchecker, findSpecificCarAd } = CarValidator;

export const carRouter = express.Router();


carRouter.post('/car', verifyToken, postAdchecker, postCarAd);
carRouter.get('/car/:id', findSpecificCarAd, getSingleCarAd);
carRouter.get('/car', statusPriceSearch, statusNewStateSearch, statusUsedStateSearch, statusManufacturerSearch, statusSearch, bodyTypeSearch, verifyToken, isAdmin, fetchAllCarAds);
carRouter.delete('/car/:id', verifyToken, isAdmin, findSpecificCarAd, deleteSingleCarAd);
carRouter.patch('/car/:id/status', verifyToken, findSpecificCarAd, editAdStatus);
carRouter.patch('/car/:id/price', verifyToken, findSpecificCarAd, editAdPrice);
