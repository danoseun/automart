import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { users } from '../dummyDb';

dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization || req.body.token;
  if (!token) {
    return res.status(403).json({
      status: 'Fail',
      mesage: 'No token supplied'
    });
  }
  jwt.verify(token, process.env.SECRETKEY, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return res.status(403).json({
          status: 'Fail',
          message: 'Invalid token supplied'
        });
      }
      return res.status(403).json({
        message: error
      });
    }
    req.authData = authData;
    return next();
  });
};


export const isAdminDummy = (req, res, next) => {
  const { email } = req.authData.payload;
  const findUser = users.find(user => user.email === email);
  if (findUser.isAdmin) {
    return next();
  }
  return res.status(401).json({
    status: 401,
    error: 'Permission denied'
  });
};