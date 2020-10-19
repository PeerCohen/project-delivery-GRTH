/*
 * PrivatePage Messages
 *
 * This contains all the text for the PrivatePage component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.PrivatePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the PrivatePage !',
  },
  errorAlert: {
    id: `${scope}.errorAlert`,
    defaultMessage: `You can not browse on this page You must register `,
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: ` If there is a problem, you can contact the manager `,
  },
});
