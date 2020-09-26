## Allan Crain's Charter programming test entry

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This was a programming task to be used as part of a job application process with Charter Communications.

## Notable files

### App.js

Contains the react-router setup.

### library.js

Library functions for faking the database interface and calculating rewards points. In a real project, I wouldn't want to just throw all of my utility functions into one library file, but it seemed easier and more expedient for a simple example app like this.

### data.js

Contains the mocked-up database structure. Four users, several products, and transactions for each user.

### components/UserList.js

The main page of the app, showing the list of people in the system so you can drill down to transaction lists.

### components/User.js

The page with details about a specific user.

### components/Transactions.js

Component for displaying the table of transactions for the given user.



## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
