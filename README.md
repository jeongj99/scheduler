# Interview Scheduler
A react-based project that allows users to book, edit, and cancel interviews. The data is persisted by the API serve using a PostgreSQL database. We use axios to make GET, PUT, and DELETE requests allowing the client to communicate with the back-end.

Each day (Mon-Fri) has a maximum of 5 available spots, and one can choose any spot to book an interview by typing their name and selecting their desired interviewer. If anything happens, one can edit their appointment, or one can completly delete their appointment.

## GIFs
!["Booking an appointment"](https://github.com/jeongj99/scheduler/blob/main/docs/Book-Appointment.gif?raw=true)
!["Editing an appointment"](https://github.com/jeongj99/scheduler/blob/main/docs/Edit-Appointment.gif?raw=true)
!["Deleting an appointment"](https://github.com/jeongj99/scheduler/blob/main/docs/Delete-Appointment.gif?raw=true)

## Dependencies
- axios
- classnames
- normalize.css
- react
- react-dom
- react-scripts

## Dev Dependencies
- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- prop-types
- react-test-renderer
- sass

## Setup

1. Install dependencies with `npm install`.
2. Run the Webpack Development Server using `npm start`. The app will be served at <http://localhost:8000/>.
3. Go to <http://localhost:8000/> in your browser.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress

In the package.json file, a add "cypress" script to the "scripts" section if not present
```javascript
"cypress": "cypress open -P ."
```

```sh
npm run cypress
```