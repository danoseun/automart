/* eslint-disable camelcase */
import { hashSync, compareSync } from 'bcrypt';
import pool from '../config/config';
import { createToken } from '../middlewares/auth';
// import { sendMail } from '../helpers/mail';
// import  Crypter  from '../helpers/crypt';
// const { encrypt, decrypt } = Crypter;
import {
  createUser, queryUsersByEmail, fetchAllUsersQuery, deleteUserQuery, updateUserRoleQuery
} from '../config/sql';


/**
 * Class representing UserController
 * @class UserController
 */
export class UserController {
  /**
     * Create user account on the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
     */
  static async register(req, res) {
    const {
      email, first_name, last_name, password, address
    } = req.body;
    const params = [
      email,
      first_name,
      last_name,
      hashSync(password, 10),
      address
    ];

    try {
      const { rows } = await pool.query(createUser, params);
      if (rows) {
        const authUser = rows[0];
        const token = createToken(authUser);
        return res.status(201).json({
          status: 201,
          data: { token }
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
     * Login user to the application
     * @static
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} JSON object representing success
     * @memeberof UserController
     */
  static async login(req, res) {
    const { email } = req.body;
    const params = [email];
    try {
      const { rows } = await pool.query(queryUsersByEmail, params);
      if (rows) {
        if (rows[0]) {
          const comparePassword = compareSync(req.body.password, rows[0].password);
          if (comparePassword) {
            const authUser = rows[0];
            const token = createToken(authUser);
            return res.status(200).json({
              status: 200,
              data: { token }
            });
          }
          if (!comparePassword) {
            return res.status(401).json({
              status: 401,
              error: 'Authentication failed'
            });
          }
        }
      }
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
