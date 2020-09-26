import React, {useEffect, useState } from 'react';
import moment from 'moment';
import {Table} from 'react-bootstrap';
import numeral from 'numeral';

import Loading from './Loading';

import {getTransactionsByUserId, chargeToPoints } from '../library.js';

/**
 * Table row for a single transaction.
 */
function TransactionRow({row}) {
  return (
    <tr>
      <td>{row.transId}</td>
      <td>{row.date}</td>
      <td>{row.charge}</td>
      <td>{row.points}</td>
    </tr>
  );
}

/**
 * Table row for the monthly total reward points.
 */
function MonthTotalPointsRow({month, points}) {
  return (
    <tr>
      <td colSpan="3" class="total-header">Total reward points for {month}:</td>
      <td>{points}</td>
    </tr>
  );
}

/**
 * Table row for the grand total rewards points.
 */
function GrandTotalPointsRow({points}) {
  return (
    <tr>
      <td colSpan="3" class="total-header">Grand total reward points:</td>
      <td>{points}</td>
    </tr>
  );
}

/**
 * Transaction list component
 */
export default function Transactions({userId, date=moment().format('YYYY-MM-DD')}) {
  const [transactions, setTransactions] = useState(null)

  // Load transactions.
  useEffect( () => {
    if (transactions===null) {
      // Note: Language is sloppy, so "a three month period" could mean a lot
      // of different things--three calendar months, the previous two full
      // months plus the current month up to today, three 31-day periods, etc.
      // I used a Moment call to get the same day of the month three months
      // prior, but I'd want to check with a product manager for clarification
      // in a real coding scenario.
      const threeMonthsAgo = moment(date).subtract(3, 'months').format('YYYY-MM-DD');
      setTransactions(getTransactionsByUserId(userId, threeMonthsAgo, date))
    }
  }, [userId, transactions, date]);

  // Show a loading message until we have transactions to display
  if (transactions===null) {
    return <Loading />;
  }

  // Go through the transactions and build table rows.
  let lastMonth = null;
  let rowCounter = 0;
  let pointsMonthTotal = 0;
  let pointsGrandTotal = 0;
  let tableRows = [];
  transactions.forEach( transaction => {
    // Convert the date to a Moment object for easier manipulation
    const date = moment(transaction.date);
    const thisMonth = date.format('MMMM YYYY'); // e.g., "January 2036"

    // Did we finish putting out rows for this month? Output the total.
    if (lastMonth !== null && lastMonth !== thisMonth) {
      tableRows.push(<MonthTotalPointsRow month={lastMonth} points={pointsMonthTotal} key={rowCounter++} />);
      pointsMonthTotal = 0;
    }
    lastMonth = thisMonth;

    // Get the reward points for this transaction
    const points = chargeToPoints(transaction.charge);

    const transactionData = {
      transId: transaction.transId,
      date: date.format('YYYY-MM-DD'),
      charge: numeral(transaction.charge).format('$0,0.00'),
      points: points,
    };

    pointsMonthTotal += points;
    pointsGrandTotal += points;

    tableRows.push(<TransactionRow row={transactionData} key={rowCounter++} />)
  });
  // Final totals
  tableRows.push(<MonthTotalPointsRow month={lastMonth} points={pointsMonthTotal} key={rowCounter++} />);
  tableRows.push(<GrandTotalPointsRow points={pointsGrandTotal} key={rowCounter++} />);

  // Return the final output.
  return (
    <Table striped bordered hover>
      <thead class="thead-dark">
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Reward points</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
    </Table>
  )
}
