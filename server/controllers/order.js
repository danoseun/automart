/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import pool from '../config/config';
import {
  postOrderQuery, findOrderQuery, updateOrderQuery, allUserOrdersQuery, fetchSingleCarAdQuery
} from '../config/sql';
/**
 * Class representing CarController
 * @class OrderController
 */
export class OrderController {
  /**
   * Post Order
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof OrderController
   */
  static async postOrder(req, res) {
    const { car_id, amount } = req.body;
    const buyer = req.authData.payload.id;
    const value = Number(car_id);

    // user should not be able to buy car/Ad he/she posted
    try {
      const { rows, rowCount } = await pool.query(fetchSingleCarAdQuery, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Invalid car id'
        });
      }
      // if (rows[0].owner === buyer) {
      //   return res.status(401).json({
      //     status: 401,
      //     error: 'You can not order for a car you posted'
      //   });
      // }
      const result = await pool.query(postOrderQuery, [buyer, value, amount]);
      if (result.rowCount !== 0) {
        const price = rows[0].price;
        // eslint-disable-next-line no-shadow
          // eslint-disable-next-line no-unused-vars
        const {
          id, buyer_id, car_id, amount, status, created_on
        } = result.rows[0];

        return res.status(201).json({
          status: 201,
          data: {
            id,
            car_id,
            created_on,
            status,
            price,
            amount
          }
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
   * Edit order price
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof OrderController
   */
  static async editOrderPrice(req, res) {
    const { price } = req.body;
    let new_price_offered;
    let old_price_offered;
    if (!price || !/^\d+$/.test(price)) {
      return res.status(400).json({
        status: 400,
        error: 'new price offered should be numbers only'
      });
    }


    const value = Number(req.params.orderId);
    const { id } = req.authData.payload;
    try {
      const { rows, rowCount } = await pool.query(findOrderQuery, [value, id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Order does not exist'
        });
      }
      old_price_offered = rows[0].amount;
      if (rowCount !== 0 && rows[0].status !== 'pending') {
        return res.status(422).json({
          status: 422,
          error: 'Sorry, this order is no longer pending'
        });
      }
      if (rowCount !== 0 && rows[0].status === 'pending') {
        const result = await pool.query(updateOrderQuery, [price, value, id]);
        if (result.rowCount !== 0) {
          const { id, car_id, status } = result.rows[0];
          new_price_offered = price;

          return res.status(200).json({
            status: 200,
            data: {
              id,
              car_id,
              status,
              old_price_offered,
              new_price_offered
            }
          });
        }
      }
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
