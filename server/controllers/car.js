/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
import db from '../config/index';
import {
  postAdQuery, fetchAllCarAdsQuery, allUserAdsQuery, deleteSingleAdQuery, updateCarAdStatus, updateCarAdPrice, statusQuery, statusPriceQuery, statusManufacturerQuery, bodyTypeQuery, statusStateQuery, queryUsersByEmail
} from '../config/sql';


/**
 * Class representing CarController
 * @class CarController
 */
export class CarController {
  /**
   * Post car Ad
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof CarController
   */
  static async postCarAd(req, res) {
    try {
      // const {
      //   state, price, manufacturer, model, body_type, img_url
      // } = req.body;


      const params = [
        req.authData.payload.id,
        req.body.state,
        req.body.price,
        req.body.manufacturer,
        req.body.model,
        req.body.body_type,
        req.body.img_url
      ];


      const { rows } = await db.query(postAdQuery, params);
      const {
        id, owner, state, status, price, manufacturer, model, body_type, img_url, created_on
      } = rows[0];
      return res.status(201).json({
        status: 201,
        data: {
          id, owner, state, status, price, manufacturer, model, body_type, img_url, created_on
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * Find car Ad
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof CarController
   */
  static getSingleCarAd(req, res) {
    const { foundCar } = req.body;
    return res.status(200).json({
      status: 200,
      data: foundCar
    });
  }

  /**
  * Fetch All posted Ads (Admin)
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON object representing success
  * @memeberof CarController
  */
  static async fetchAllCarAds(req, res) {
    try {
      const { rows } = await db.query(fetchAllCarAdsQuery);
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
  * Fetch All posted Adverts by a user
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON object representing success
  * @memeberof CarController
  */
  static async fetchAllUserAds(req, res) {
    const { id } = req.authData.payload;

    try {
      const { rows, rowCount } = await db.query(allUserAdsQuery, [id]);
      if (rowCount === 0) {
        return res.status(404).json({
          status: 404,
          error: 'You are yet to post any car Ads'
        });
      }
      return res.status(200).json({
        status: 200,
        data: rows
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
      * Delete Single posted Ad (Admin)
      * @static
      * @param {object} req - The request object
      * @param {object} res - The response object
      * @return {object} JSON object representing success
      * @memeberof CarController
    */
  static async deleteSingleCarAd(req, res) {
    const { foundCar } = req.body;

    try {
      const { rowCount } = await db.query(deleteSingleAdQuery, [foundCar.id]);
      if (rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: 'Car Ad successfully deleted'
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
   * Edit status of posted Ad
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @memeberof CarController
   */
  static async editAdStatus(req, res) {
    const { foundCar } = req.body;
    const { id } = req.authData.payload;


    if (foundCar.status === 'unsold') {
      try {
        const { rows, rowCount } = await db.query(updateCarAdStatus, ['sold', foundCar.id, id]);
        if (rowCount !== 0) {
          return res.status(200).json({
            status: 200,
            data: rows[0]
          });
        } return res.status(404).json({
          status: 404,
          error: 'This ad does not exist'
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    return res.status(422).json({
      status: 422,
      error: 'This ad has already been marked as sold'
    });
  }

  /**
  * Edit price of posted Ad
  * @static
  * @param {object} req - The request object
  * @param {object} res - The response object
  * @return {object} JSON object representing success
  * @memeberof CarController
  */
  static async editAdPrice(req, res) {
    let { price, foundCar } = req.body;
    const { id } = req.authData.payload;
    // console.log("Price", req.body)
    if (!price) {
      return res.status(400).json({
        status: 400,
        error: 'Enter a price or retain the old price'
      });
    }
    if (price) {
      // price = price.trim();
      if (!/^\d+$/.test(price)) {
        return res.status(400).json({
          status: 400,
          error: 'Price should be only a string of numbers'
        });
      }
    }
    try {
      const { rows, rowCount } = await db.query(updateCarAdPrice, [price, foundCar.id, id]);
      if (rowCount !== 0) {
        return res.status(200).json({
          status: 200,
          data: rows[0]
        });
      }
      return res.status(404).json({
        status: 404,
        error: 'This ad does not exist'
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message
      });
    }
  }

  /**
   * Filter by unsold/available and price range of cars
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async statusSearch(req, res, next) {
    console.log('search1', req.query);
    if (req.query.status && !req.query.state && !req.query.manufacturer && !req.query.bodytype) {
      console.log('search1a', req.query);
      let { status } = req.query;
      status = status.trim().toLowerCase();
      try {
        const { rows, rowCount } = await db.query(statusQuery, ['unsold']);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Sorry, this does not exist'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }

  /**
   * Filter by unsold/available and price range of cars
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async statusPriceSearch(req, res, next) {
    console.log('search2', req.query);
    if (req.query.status && req.query.minprice && req.query.maxprice) {
      console.log('search2a', req.query);
      console.log('haa', req.query);
      console.log('here');
      let { status, minprice, maxprice } = req.query;
      console.log('here');
      status = status.trim().toLowerCase();
      try {
        const { rows, rowCount } = await db.query(statusPriceQuery, ['unsold', minprice, maxprice]);
        console.log(rowCount);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'There is no search for your result now'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }

  /**
   * Filter cars by status and state(new)
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async statusNewStateSearch(req, res, next) {
    console.log('search3', req.query);
    if (req.query.status && req.query.state === 'new') {
      console.log('search3a', req.query);
      let { status, state } = req.query;
      status = status.trim().toLowerCase();
      state = state.trim().toLowerCase();
      try {
        const { rows, rowCount } = await db.query(statusStateQuery, ['unsold', 'new']);
        console.log('i tire', rows);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'No search for this result yet'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }

  /**
   * Filter cars by status=unsold and status(used)
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async statusUsedStateSearch(req, res, next) {
    console.log('searchUsed', req.query);
    if (req.query.status && req.query.state === 'used') {
      console.log('search3aUsed', req.query);
      let { status, state } = req.query;
      status = status.trim().toLowerCase();
      state = state.trim().toLowerCase();
      try {
        const { rows, rowCount } = await db.query(statusStateQuery, ['unsold', 'used']);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'No search for this result yet'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }

  /**
   * Filter cars by status&manufacturer
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async statusManufacturerSearch(req, res, next) {
    console.log('search4', req.query);
    if (req.query.status && req.query.manufacturer) {
      console.log('search4a', req.query);
      let { status, manufacturer } = req.query;
      status = status.trim().toLowerCase();
      manufacturer = manufacturer.trim().toLowerCase();
      try {
        const { rows, rowCount } = await db.query(statusManufacturerQuery, ['unsold', manufacturer]);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'No search for this result yet1'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }

  /**
   * Filter by unsold/available and price range of cars
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} JSON object representing success
   * @param {function} next - Calls the next function/route handler
   * @memeberof CarController
   */
  static async bodyTypeSearch(req, res, next) {
    console.log('search5', req.query);
    if (req.query.body_type) {
      console.log('search5a', req.query);
      let { body_type } = req.query;
      body_type = body_type.trim().toLowerCase();

      try {
        const { rows, rowCount } = await db.query(bodyTypeQuery, [body_type]);
        if (rowCount === 0) {
          return res.status(404).json({
            status: 404,
            error: 'No search for this result yet2'
          });
        }
        return res.status(200).json({
          status: 200,
          data: rows
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    }
    next();
  }
}
