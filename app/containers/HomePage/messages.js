/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Wellcome to Get Moving ',
  },
  sponsoredText: {
    id: `${scope}.sponsoredText`,
    defaultMessage: 'Sponsored',
  },
  infoText: {
    id: `${scope}.infoText`,
    defaultMessage: 'Your partner for a successful !',
  },
});
