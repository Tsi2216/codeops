# Validated Persistent Signup Form

## Requirements

- Prevents page reload when the form is submitted.
- Validates names to be at least two characters.
- Validates Ethiopian phone numbers using regex.
- Accepts 09... and +2519... phone numbers.
- Displays the first validation error clearly.
- Saves valid signup data to localStorage as JSON.
- Restores saved users when the page is refreshed.
- Displays the current number of signed-up users.

## How to Open

Open `index.html` in a web browser.

## Self-Check

- Submit an empty name and check the validation error.
- Enter a name with one character and check the validation error.
- Enter an invalid phone number and check the validation error.
- Enter a valid name and Ethiopian phone number.
- Refresh the page and confirm the signed-up user count remains.