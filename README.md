# Interview Scheduler
Interview scheduler is a single-page application that allows users to book, edit and cancel interviews, as well as view how many available appointments are remaining for each day.

This app was developed using React, Webpack, Babel, Axios, Storybook and Express. Data is persisted by the API server using a PostgreSQL database. Unit testing, integration testing and end-to-end testing was completed using Jest and Cypress.

## Screenshots

!["Selecting a day"](https://github.com/lilyhabbs/scheduler/blob/master/docs/select-day.gif)
*Selecting a day*


!["Booking an appointment"](https://github.com/lilyhabbs/scheduler/blob/master/docs/book-appt.gif)
*Booking an appointment (with validation on form elements and spinner to show request is being processed)*


!["Editing an appointment"](https://github.com/lilyhabbs/scheduler/blob/master/docs/edit-appt.gif)
*Editing an appointment (with spinner to show request is being processed)*


!["Deleting an appointment"](https://github.com/lilyhabbs/scheduler/blob/master/docs/delete-appt.gif)
*Deleting an appointment (with confirmation to delete and spinner to show request is being processed)*


!["Error message"](https://github.com/lilyhabbs/scheduler/blob/master/docs/errors.gif)
*Error messages when unable to save or delete an appointment*


## Getting started

1. Install dependencies with `npm install`.
2. Start the webpack development server with `npm start`.
3. Run the Jest test framework with `npm test`.
4. Run the Storybook visual testbed with `npm run storybook`.

## Dependencies

- axios: ^0.21.1
- classnames: ^2.2.6
- normalize.css: ^8.0.1
- react: ^16.9.0
- react-dom: ^16.9.0
- react-scripts: 3.0.0
- babel/core: ^7.4.3
- storybook/addon-actions: ^5.0.10
- storybook/addon-backgrounds: ^5.0.10
- storybook/addon-links: ^5.0.10
- storybook/addons: ^5.0.10
- storybook/react: ^5.0.10
- testing-library/jest-dom: ^4.0.0
- testing-library/react: ^8.0.7
- testing-library/react-hooks: ^5.1.2
- babel-loader: ^8.0.5
- node-sass: ^4.14.0
- prop-types: ^15.7.2
- react-test-renderer: ^16.9.0    