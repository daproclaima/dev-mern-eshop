# NOBOUR Mern e-shop

An e-commerce website written on MERN stack and available at: https://nobour-mern-eshop.herokuapp.com/

## Project description

This section covers what can be done on this application, how to use it and what are its technologies. This repository is archived since it is a demo website. 
It is a 100 hours project and my hourly rate is 50 €. A production version with securities and optimization is stored on one of my private repositories. And I am ready to deploy it for 400 €. What you will see on https://nobour-mern-eshop.herokuapp.com/ is soon the production version.

### Tasks performed on this application

### Technical explanations

This SPA is part of a whole MERN stack project.
The project source code is available at [https://github.com/DaProclaima/mern-eshop](https://github.com/DaProclaima/mern-eshop)

#### Archived:

This frontend application source code is available at: [https://github.com/DaProclaima/mern-shop-frontend](https://github.com/DaProclaima/mern-shop-frontend)

The backend software source code is available at : [https://github.com/DaProclaima/mern-shop-apiendpoints](https://github.com/DaProclaima/mern-shop-apiendpoints)

#### Initial Environment of this application

Node.js version is 14.15.3

Node package manager is Yarn version 1.22.5

React version is 17.0.1

Express.js version is 4.17.1

## Installation
TODO
node, yarn, backend yarn install, frontend cd ./frontend/ yarn install

## Available Scripts

### Global project

#### `yarn start`

Runs the Express.js backend API for production as it executes node process on apiendpoints/server.
Open [http://localhost:5000](http://localhost:5000) to access it in the browser.

#### `yarn server`

Runs the Express backend API for development and restart at every change as it executes nodemon
on apiendpoints/server.
Open [http://localhost:5000](http://localhost:5000) to access it in the browser.

#### `yarn client`

Runs the React frontend SPA in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the frontend app in the browser.

#### `yarn dev`

Executes yarn client and yarn server to get the backend and frontend processes running in dev environment.
Any change both in frontend and backend restart their respective processes.

Open [http://localhost:5000](http://localhost:5000) to access the API it in the browser.

Open [http://localhost:3000](http://localhost:3000) to view the frontend app in the browser.

### Frontend app

In the frontend project directory, you can run:

#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Backend API Endpoints

In the backend project at root project directory, you can run:

### `yarn start`

Runs the API in the development mode.\
Open [http://localhost:5000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### API Routes
TODO

Products:

- GET api/products
- GET
- POST


## Development history

### - 2 Feb 2021 11:58pm : initial commit


### - 4 Feb 2021:
  Merge backend and frontend projects in single code repo.
  Frontend dev: add pages for Product details and list of products with their components (rating) 
  and bit of styling through bootstrap and css, use of react hooks to manage state (useEffect, useState),
  react components (Router, route, router of bootstrap... 
  all that for not reloading whole page and just change dom child objects)
  
  
  Backend dev: create Express api endpoints for products and load their data from backend mock. 
  Add color to logger. Connection to MongoDB server and storing credentials in untracked .env. 
  Set up of connection with MongoDB servers and API with mongoose. Definition of models for user, 
  product and order. ServerError and notFound errors handled with middlewares.


### - 5 Feb 2021:
  Frontend dev: add redux store, load products list, product details to HomeScreen through store and handle errors. 
  Add cart and its items, stores its data in localstorage and retrieves them to set them in store
  (Redux:Use actions to fetch data, data get filtered in reducers, redux store gets data from reducers, 
  store updates app state to give data to templates.)


### - 6 Feb 2021: 
Frontend dev: add remove item from cart feature. 

Backend dev: set up controllers and cleans up routes for product. Add user controller and routes.
Add passwordMatch method to userModel and create user login route and controller. Add JWT to user authenticated.
Add user profile route and protect routes with JWT validation.
Add user registration with post request. Use mongoose pre save hook to hash password 
before saving if email and username are not modified. 


Frontend: set user login. Stores user info in localstorage and store, add loginScreen and Form container component. 
Handle redirect. Show username in  header and add logout ( remove userInfo from store and localStorage).
Add user register features and template.

Backend: add user update feature to change password, name, email.

Frontend: add user Profile page along with a reducer, actions for getting user profile in store and page. 
Add user profile edition.


### - 7 Feb 2021: 

Frontend: Add shipping screen to save user contact details. Add checkout steps to shipping screen. 
Add payment methods screen with reducer and actions, local storage and in store. Add Place Order screen. 

Backend: add Order controller, model and routes for order creation and getting order by id.

Frontend: add order reducer, actions and constants. Connect it to backend to create order and get order by id. 
Add order screen.

### - 8 Feb 2021: 

Backend: add updateOrderToPaid function in controller and expose it to server through routes, add connection to 
PayPal sandbox. Create route and controller to get connected user's orders.
Frontend: add reducer, constant and actions to consume updateOrderToPaid backend function. 
Connect application to paypal and allow payment for order. Add action and reducer to show connected user's orders 
in his profile & orders page. Add Order details page.

Backend: Admin part: add get users feature if admin. add user delete route and endpoint for admins. Add user edition
route and controller.

Frontend: Admin part: add users list page for admins. Add user deletion for admins. Add user edition screen, reducer
actions and connect it with backend.

### - 8 Feb 2021: 
Frontend: admin part: create product list screen. Consumes product delete.

Backend: admin part: create product delete endpoint.

### - 11 Feb 2021: 
Backend: admin part: create the createProduct and updateProduct endpoints and routes. Add image upload feature
Frontend: admin part: create constants, actions, reducers for creating and updating products.

### - 12 Feb 2021: 
Frontend: Admin: Add image upload feature at product edit.

### - 13 Feb 2021:
Frontend : admin: create OrderListScreen. add constants for list orders, reducer, actions.
Backend: admin: create endpoint to get list of orders, updates order router.

### - 22 Feb 2021: 
Frontend: admin: create constants for Order
Backend: admin: create endpoint to update order delivery status. 
Add create product review endpoint and use HTTP logger Morgan

### - 23 Feb 2021:
Frontend: add create review buttons. Add searchBox, product result pagination.
Backend: fix product review schema by adding createdAt field and set its date in productController.
Add product search by keyword and results pagination.

### - 24 Feb 2021: 
Frontend: add product carousel on homepage to show top rated products. Add meta description with react-meta
Backend: add top rated products endpoints.
Deployment in production on https://nobour-mern-eshop.herokuapp.com/

### - 25 Feb 2021: 
This project is archived in favor of a private version ready for production to sell.
