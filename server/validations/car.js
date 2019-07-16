/* eslint-disable camelcase */
/* eslint-disable prefer-const */
import 'dotenv/config';
import pool from '../config/config';
import { fetchSingleCarAdQuery } from '../config/sql';

/**
 * Class representing Car validations
 * @class CarValidator
 */
export class CarValidator {
  /**
       * @param {object} req - The request object
       * @param {object} res - The response oject
      * @param {function} next
      * @returns {object} JSON representing the failure message
    */
  static postAdchecker(req, res, next) {
    let {
      state, price, manufacturer, model, body_type, img_url
    } = req.body;

    const errors = [];
    if (!state) {
      const error = {
        message: 'Please specify the state of the car'
      };

      errors.push(error);
    }
    if (state) {
      state = state.trim();
      if (state.toLowerCase() !== 'new' && state.toLowerCase() !== 'used') {
        const error = {
          message: 'State can only be new or used'
        };
        errors.push(error);
      }
    }


    if (!price) {
      const error = {
        message: 'You will need to specify a sale price'
      };
      errors.push(error);
    }
    if (price) {
      // price = price.trim();
      if (!/^\d+$/.test(price)) {
        const error = {
          message: 'Price should be numbers only'
        };
        errors.push(error);
      }
    }

    if (!manufacturer) {
      const error = {
        message: 'Specify a manufacturer'
      };
      errors.push(error);
    }

    if (manufacturer) {
      manufacturer = manufacturer.trim();
      if (/[^a-zA-Z]/.test(manufacturer)) {
        const error = {
          message: 'Manufacturer field accepts alphabets only'
        };
        errors.push(error);
      }
    }

    if (!model) {
      const error = {
        message: 'Specify the model of the vehicle'
      };
      errors.push(error);
    }

    if (model) {
      model = model.trim();
      if (/[^a-zA-Z]/.test(model)) {
        const error = {
          message: 'Model field accepts alphabets only'
        };
        errors.push(error);
      }
    }

    if (!body_type) {
      const error = {
        message: 'You will need to specify a bodytype'
      };
      errors.push(error);
    }

    if (body_type) {
      body_type = body_type.trim();
      if (/[^a-zA-Z]/.test(body_type)) {
        const error = {
          message: 'Bodytype field accepts alphabets only'
        };
        errors.push(error);
      }
    }

    if (!img_url) {
      const error = {
        message: 'You need to upload an image for this car'
      };
      errors.push(error);
    }

    if (img_url) {
      let extension;
      extension = img_url.split('.').pop();
      extension = extension.replace(/'/g, '').trim();
      extension = extension.toLowerCase();
      const validImageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'com'];
      if (!validImageExtensions.includes(extension)) {
        const error = {
          message: 'This image is not a valid image'
        };
        errors.push(error);
      }
    }


    if (errors.length) {
      return res.status(400).json({
        status: 400,
        errors: {
          body: errors.map(err => err.message)
        }
      });
    }


    req.body.state = state.toLowerCase().trim();
    req.body.price = price;
    req.body.manufacturer = manufacturer.toLowerCase();
    req.body.model = model.toLowerCase();
    req.body.body_type = body_type.toLowerCase();
    req.body.img_url = img_url;
    return next();
  }

  /**
   * Fetch Specific Car On to the application
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next function/route handler
   * @returns {object} JSON representing the failure message.
   */
  static async findSpecificCarAd(req, res, next) {
    const { id } = req.params;
    if (/[a-zA-Z]/.test(id)) {
      return res.status(400).json({
        status: 400,
        error: 'Invalid entry'
      });
    }
    const value = Number(id);

    try {
      const { rows, rowCount } = await pool.query(fetchSingleCarAdQuery, [value]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'Car not found'
        });
      }
      const foundCar = rows[0];
      req.body.foundCar = foundCar;
      next();
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }
}
