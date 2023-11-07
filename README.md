# How to start project:

 ## Laravel

 - `git clone https://github.com/Moxie5/projectApiInters.git`

 - `composer install`
 
 - copy .env file and add db name, username and password 

 - `php artisan migrate`

 - `php artisan db:seed`

 - Default user to login is email: `admin@abv.bg` password `123456`

 ## React

 - `git clone https://github.com/PeterMonev/React-Laravel-API`

 - `npm install`

 - `npm start`

# React Endpoints:

- `http://localhost:3000/` - Dashboard for Logged user (only for logged in user).

- `http://localhost:3000/dashboard` - Dashboard for Logged user they can edit their own info (only for logged in user).

- `http://localhost:3000/login` - Guest can login.

- `http://localhost:3000/register` - Guest can register.

- `http://localhost:3000/logout` - Users can logout.

- `http://localhost:3000/cars` - Users and guest can view all cars (logged user can create new car).

- `http://localhost:3000/cars/1` - Users and guest can view car details.


# Laravel API Endpoints:

- `POST http://127.0.0.1:8000/api/register` - User registration.

- `POST http://127.0.0.1:8000/api/login` - User login (providing a Sanctum token upon successful login).

- `POST http://127.0.0.1:8000/api/updateUserInfo/${user.id}` - User can update their infomation.

- `GET http://127.0.0.1:8000/api/getUserInfo/${userId}` - Get a user infromation.

- `GET http://127.0.0.1:8000/api/getAllCars` - Get all cars (accessible for everyone).

- `POST http://127.0.0.1:8000/api/updateUserInfo/${user.id}` - Create car (accessible for logged in users).

- `GET http://127.0.0.1:8000/api/getCarById/${id}` - Get details car  (accessible for everyone).