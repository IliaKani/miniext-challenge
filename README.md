# miniExtensions Team Test Assignment

## Project Description

This project is a test assignment from the miniExtensions team. The challenge is to implement a user authentication system that allows users to sign up and log in using their email, Google OAuth2, or phone number. The application must always have the user's email and phone number.

## Challenge Details

Given an initial code base that allows users to login/signup with an Email and with Google OAuth2, the task is to implement the ability for the users to login/signup with their phone numbers. This means:

- If the user creates an account with an email or Google OAuth2, immediately ask the user to provide a phone number.
- If the user creates an account with a phone number, immediately ask the user to provide an email.

The solution is written to fit with the style of the initial codebase, with some rewrites and re-architecturing to enhance the project.

## Dependencies

- Firebase CLI
- Node and NPM

## How to Run

1. Create a Firebase project.
2. Under "Authentication" > "Sign-in Methods", make sure you have:
   - Email/Password with passwordless sign-in turned on
   - Phone
   - Google
3. Clone this repository.
4. Install the dependencies with `npm install`.
5. Copy the file `.env.template` and rename it to `.env`.
6. Replace all "FILL_ME_IN" with an actual value. You can find these values for your Firebase project under "Project Settings" > "General" > "Your apps".
7. Update the "FILL_ME_IN" value in the file `scripts/dev.sh` line 20 with the proper value. The proper value is the project name you gave your project in Firebase.
8. Update the "FILL_ME_IN" value in the file `.firebaserc` line 3 with the proper value. This value must be the same as the "default bucket" value you put in the `.env` file.
9. Login to Firebase using the CLI by running `firebase login`.
10. Run the development instance with `npm run dev`.
11. Access the website at http://localhost:3000.
