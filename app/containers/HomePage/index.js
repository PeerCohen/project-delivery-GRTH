import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PersonIcon from '@material-ui/icons/Person';
import messages from './messages';
import { makeSelectNameLogged } from '../LoginPage/selectors';
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
        <FormattedMessage {...messages.sponsoredText} />
        <img className="GRTH" src={GRTH} alt="imageGRTH" />
        <FormattedMessage {...messages.infoText} />
      </div>
    </div>
  );
}
HomePage.propTypes = {
  userName: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  userName: makeSelectNameLogged(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(HomePage);
