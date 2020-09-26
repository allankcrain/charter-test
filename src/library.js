/**
 * Library functions.
 */
import database from './data';
import moment from 'moment';

/**
 * Get a specific User record given its user ID
 */
export function getUserByUserId(userId) {
  return database.users.find( (record) => record.userId===userId );
}

/**
 * Get all User records from the database
 */
export function getUsers() {
  return database.users;
}

/**
 * Get the transactions for a particular user during the given time period.
 *
 * Returns an array of transaction records sorted by date ascending.
 */
export function getTransactionsByUserId(userId, fromDate, toDate) {
  return database.transactions.filter( (record) =>
    record.userId===userId &&
    record.date >= fromDate &&
    record.date <= toDate
  ).sort( (a, b) => moment(a.date).unix() - moment(b.date).unix());
}

/**
 * Convert a dollar amount to a rewards point value.
 *
 * Users get 1 point for every dollar between $50 and $100 and 2 points for
 * every dollar above $100.
 */
export function chargeToPoints(charge) {
  return Math.floor( // Integers only
    Math.max(charge -  50, 0) + // One point for every dollar over 50
    Math.max(charge - 100, 0)   // One extra point for every dollar over 100
  );
}
