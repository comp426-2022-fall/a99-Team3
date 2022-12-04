# File Description

## User Database
Users can:
- create profile
- update profile
- delete profile
- view profile

Required Infomation:
- Username
- Email Address
- Password

Can be changed:
- Username 
- Email
- Password

## index.html
This is the entry point that has forms for Login, Sign Up, viewing all User's and their data, Deleting User, showing Profile, and Changing username.
- Login will stay and be styled and changes between login based on status which is tracked by global var loggedIn in forms.js
- Sign Up should also stay if the user is logged in and hide if not
- Viewing all user's data is for testing only and should be removed immediately
- Deleting users will delete own user when logged in and requires password to confirm
- Showing profile should stay, but only be visible when logged in
- Changing username should stay, only visible when logged in

## fortune.html
This is the entry point that has forms for generating fortune cookie and fortune level
- Click the top button would return a randomly generated fortune cookie sentence
- Click the bottom button would return a randomly generated fortune level with range [1, 10]

## database.js
It creates the SQLite database with fields for
- Username
- Password 
- Email

## forms.js
This is the script linked from the index.html file. There are functions for each of the forms and actions listed in index.html and gloabl variables.
- current (var of current user data when logged in)
- isLogIn (boolean var of if the user is logged in)
- New User Creation
- Delete User
- Updating User
- Login
- Show Profile

## server.js
It has CRUD API endpoints using express.js and better-sqlite3 to do all of the functions above.

## styles.css
This file contains all the aesthetic elements in the index.html and fortune.html files.
