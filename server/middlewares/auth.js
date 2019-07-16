/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// import { users, cars } from '../dummyDb';

dotenv.config();

export const createToken = (payload) => {
  const token = jwt.sign({ payload }, process.env.SECRETKEY);
  return token;
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json({
      status: 403,
      error: 'No token supplied'
    });
  }
  jwt.verify(token.split('Bearer ')[1], process.env.SECRETKEY, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return res.status(403).json({
          status: 403,
          error: 'Invalid token supplied'
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


export const isAdmin = (req, res, next) => {
  const { is_admin } = req.authData.payload;
  if (is_admin === true || is_admin === false) {
    return next();
  }

  return res.status(401).json({
    status: 401,
    error: 'You do not have permissions to access this route'
  });
};

// export const isAdminDummy = (req, res, next) => {
//   const { email } = req.authData.payload;
//   const findUser = users.find(user => user.email === email);
//   if (findUser.isAdmin) {
//     return next();
//   }
//   return res.status(401).json({
//     status: 401,
//     error: 'Permission denied'
//   });
// };

// export const isOwnerDummy = (req, res, next) => {
//   const { email } = req.authData.payload;
//   const { id } = req.params;
//   const value = Number(id);
//   const foundUser = users.find(user => user.email === email);
//   const foundCar = cars.find(car => car.id === value);
//   if (foundUser.id !== foundCar.owner) {
//     return res.status(401).json({
//       status: 401,
//       error: 'You can not edit this ad'
//     });
//   }
//   return next();
// };
