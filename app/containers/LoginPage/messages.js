/*
 * LoginPage Messages
 *
 * This contains all the text for the LoginPage container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LoginPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the LoginPage container!',
  },
  alertSuccess: {
    id: `${scope}.alertSuccess`,
    defaultMessage: 'success checked ! Click ',
  },
  alertSuccessLink: {
    id: `${scope}.alertSuccessLink`,
    defaultMessage: ' to move to the home page ',
  },
  alertError: {
    id: `${scope}.alertError`,
    defaultMessage: `Sorry you are not logged in - `,
  },
});
