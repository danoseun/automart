import pool from '../config/config';

const ordersTable = `DROP TABLE IF EXISTS orders CASCADE;
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY NOT NULL,
        buyer_id INTEGER NOT NULL,
        car_id INTEGER NOT NULL,
        amount CHARACTER VARYING(50) NOT NULL,
        status CHARACTER VARYING(30) NOT NULL DEFAULT ('pending'),
        created_on TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        FOREIGN KEY (buyer_id) references users (id) ON DELETE CASCADE,
        FOREIGN KEY (car_id) references cars (id) ON DELETE CASCADE
    )`;

/**
         * Function representing usertableHandler
         * @returns {object} representing success or failure
*/
export default async function createOrderTable() {
  try {
    const create = await pool.query(ordersTable);
    console.log(`ordersTable: ${create[0].command}PED and ${create[1].command}D`);
  } catch (error) {
    console.log(`ordersTable ${error}`);
  }
}
