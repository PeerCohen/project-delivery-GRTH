/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PersonIcon from '@material-ui/icons/Person';
import messages from './messages';
import GRTH from '../../images/grth-logo.png';
import './index.scss';

export function HomePage({ userName }) {
  return (
    <div>
      {userName && (
        <div className="p-user">
          hi {userName} <PersonIcon color="secondary" />
        </div>
      )}
      <h1 className="titleHome">
        <FormattedMessage {...messages.header} />
      </h1>
      <div className="divBodyHome">
        Sponsored
        <img className="GRTH" src={GRTH} alt="imageGRTH" />
        Your partner for a successful !
      </div>
    </div>
  );
}
HomePage.propTypes = {
  userName: PropTypes.string,
};

// const mapStateToProps = createStructuredSelector({
//   userName: makeSelectUserName(),
// });

const mapStateToProps = state => ({
  userName: state.loginPage && state.loginPage.userName,
});
// const withConnect = connect(mapStateToProps);

export default connect(mapStateToProps)(HomePage);

// example HOC

// function HOC(Component) {
//   return (
//     <div>
//       <Component />
//     </div>
//   );
// }
