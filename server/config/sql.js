/** User SQL */
export const createUser = 'INSERT INTO users (email, first_name, last_name, password, address) VALUES ($1, $2, $3, $4, $5) returning *';
export const fetchAllUsersQuery = 'SELECT * FROM users';
export const deleteUserQuery = 'DELETE FROM users WHERE email = $1';
export const queryUsersByEmail = 'SELECT * FROM users WHERE email = $1';
export const updateUserRoleQuery = 'UPDATE users SET is_admin = $1 WHERE email = $2 returning *';

/** Car SQL */
export const postAdQuery = 'INSERT INTO cars (owner, state, price, manufacturer, model, body_type, img_url) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
export const fetchSingleCarAdQuery = 'SELECT * FROM cars WHERE id = $1';
export const fetchAllCarAdsQuery = 'SELECT * FROM cars';
export const deleteSingleAdQuery = 'DELETE FROM cars WHERE id=$1 returning *';
export const updateCarAdStatus = 'UPDATE cars SET status = $1 WHERE id = $2 and owner = $3 returning *';
export const updateCarAdPrice = 'UPDATE cars SET price = $1 WHERE id = $2 and owner = $3 returning *';
export const allUserAdsQuery = 'SELECT * FROM cars WHERE owner = $1';

/** query string SQLs */
export const statusQuery = 'SELECT * FROM cars WHERE status = $1';
export const statusPriceQuery = 'SELECT * FROM cars WHERE status = $1 AND price >= $2 AND price <= $3';
// export const statusNewStateQuery = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
// export const statusUsedStateQuery = 'SELECT * FROM cars WHERE status = $1 AND state = $2';
export const statusManufacturerQuery = 'SELECT * FROM cars WHERE status = $1  AND manufacturer = $2';
export const bodyTypeQuery = 'SELECT * FROM cars WHERE body_type = $1';
export const statusStateQuery = 'SELECT * FROM cars WHERE status = $1 AND state = $2';

/** Order Query */
export const postOrderQuery = 'INSERT INTO orders (buyer_id, car_id, amount) VALUES ($1, $2, $3) returning *';
export const findOrderQuery = 'SELECT * FROM orders WHERE id = $1 AND buyer_id = $2';
export const updateOrderQuery = 'UPDATE orders SET amount = $1 WHERE id = $2 and buyer_id = $3 returning *';
export const allUserOrdersQuery = 'SELECT * FROM orders WHERE buyer_id = $1';

/** Flag Query */
export const createFlagQuery = 'INSERT INTO flags (userid, car_id, reason, description) VALUES ($1, $2, $3, $4) returning *';
