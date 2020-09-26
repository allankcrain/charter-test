let database = {
  products: [],
  users: [],
  transactions: [],
}

// Fill the database.
database.products = [
  {
    sku: 1,
    name: 'Whatsit',
    price: 4.99,
  },
  {
    sku: 2,
    name: 'Diamond Whatsit',
    price: 499.99,
  },
  {
    sku: 3,
    name: 'Thingy',
    price: 19.50,
  },
  {
    sku: 4,
    name: 'Gold-plated thingy',
    price: 57.00,
  },
  {
    sku: 5,
    name: 'Thingy fuel (1gal)',
    price: 14.07,
  },
  {
    sku: 6,
    name: 'Whatsit polish',
    price: 1.00,
  },
  {
    sku: 7,
    name: 'The exact given example',
    price: 120.00,
  }
];

database.users = [
  {
    userId: 0,
    name: "Samantha Rose"
  },
  {
    userId: 1,
    name: "John Stevenson"
  },
  {
    userId: 2,
    name: "Steven Johnson"
  },
  {
    userId: 3,
    name: "Genevieve McWilliams"
  }
];

database.transactions = [
];

/**
 * Transaction record builder function, just to make typing easier.
 */
function bt(userId,date,skus) {
  let charge = 0;
  skus.forEach( sku => {
    // Find the sku in the "database"
    let product = database.products.find( p => p.sku===sku );
    charge += product.price;
  });

  let transId = database.transactions.length+1;

  database.transactions.push({transId, userId, skus, date, charge});
}

// Samantha's transactions
bt(0, '2020-09-25', [1,6,6,6]); // A whatsit and some whatsit polish
bt(0, '2020-09-15', [4,5]); // A thingy and some thingy fuel
bt(0, '2020-08-21', [2,2,1]); // That's Christmas shopping done
bt(0, '2020-03-15', [3]); // She lost this thingy in the move

// John's transactions
bt(1, '2020-09-20', [7]); // Sanity check

// Steven's transactions
bt(2, '2020-05-04', [2,4]); // Big spender
bt(2, '2020-05-15', [5,5,5,6]); // The fuel and polish are how they really get you, though.
bt(2, '2020-05-30', [5,5,5,6]);
bt(2, '2020-06-15', [5,5,5,6]);
bt(2, '2020-06-30', [5,5,5,6]);
bt(2, '2020-07-15', [5,5,5,6,6]);
bt(2, '2020-07-30', [5,5,5,6]);
bt(2, '2020-08-15', [5,5,5,6,5,5,5]);
bt(2, '2020-08-30', [5,5,5,6]);
bt(2, '2020-09-15', [5,5,5,6,7]);

// Genevieve's transactions. Dates out of order to verify that the sorting works.
bt(3, '2020-09-24', [1,2,3]);
bt(3, '2020-09-25', [5,5]);
bt(3, '2020-08-14', [3,2,1]);
bt(3, '2020-09-15', [5,5,5,5]);
bt(3, '2020-08-12', [6,6,6,6,6]);
export default database;
