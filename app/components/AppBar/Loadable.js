/**
 *
 * Asynchronously loads the component for AppBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
