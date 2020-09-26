import React, { useState, useEffect }  from 'react';
import { useParams, Link } from 'react-router-dom';

import { getUserByUserId } from '../library.js';

import Loading from './Loading';
import Transactions from './Transactions';

/**
 * Display a User's info and transactions list.
 */
function User() {
  const userId = parseInt(useParams().userId);  // Get the userId from the route parameter
  const [user, setUser] = useState(null);       // Set up internal state

  // Effect hook to load the user from the DB
  useEffect( () => {
    user===null && setUser(getUserByUserId(userId));
  }, [userId, user]);

  let mainBody = null;
  switch(user) {
    // User will be 'null' when it hasn't finished loading yet.
    case null:
      mainBody = <Loading />;
      break;

    // User will be 'undefined' if that user ID doesn't exist in the database
    case undefined:
      mainBody = <div>Invalid user id {userId}</div>;
      break;

    // Anything else indicates we have a real user, so show the transactions.
    default:
      mainBody =  (
        <div>
          Showing transactions for {user.name}<br />

          <Transactions userId={userId} />
        </div>
      );
  }

  return (
    <div> <Link to="/users">Return to User List</Link><br/><br/>
      {mainBody}
    </div>
  );
}

export default User;
