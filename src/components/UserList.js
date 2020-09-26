import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {getUsers} from '../library';


export default function UserList() {
  const [users, setUsers] = useState([]);

  // Load user list from the database into component state.
  useEffect( () => {
    users.length===0 && setUsers(getUsers());
  }, [users]);

  const userListItems = users.map( user => (
    <li key={user.userId}>
      <Link to={'/users/'+user.userId}>{user.name}</Link>
    </li>
  ));

  return (
    <div>
      <ul>
        {userListItems}
      </ul>
    </div>
  );
}
