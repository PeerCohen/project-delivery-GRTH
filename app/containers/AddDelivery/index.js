/**
 *
 * AddDelivery
 *
 */

import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Helmet} from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import {useInjectSaga} from 'utils/injectSaga';
import {useInjectReducer} from 'utils/injectReducer';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {addDelivery} from 'containers/App/actions';
import makeSelectAddDelivery from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './index.scss';

export function AddDelivery(onAdded) {
  useInjectReducer({key: 'addDelivery', reducer});
  useInjectSaga({key: 'addDelivery', saga});
  const [add, setAdd] = useState('');
  function handleAddChange(propertyName, event) {
    const addDel = {...add};
    addDel[propertyName] = event.target.value;
    setAdd(addDel);
  }
  function AddingToList() {
    return (
      <form noValidate>
        <TextField
          id="standard-search"
          label="Name"
          className="textField"
          value={add.name}
          onChange={handleAddChange.bind(this, 'name')}
        />
        <br />
        <TextField
          id="standard-search"
          label="email"
          className="textField"
          value={add.email}
          onChange={handleAddChange.bind(this, 'email')}
        />
        <br />
        <TextField
          id="standard-search"
          label="phone"
          className="textField"
          value={add.phone}
          onChange={handleAddChange.bind(this, 'phone')}
        />
        <br />
        <TextField
          id="standard-search"
          label="addressTo"
          className="textField"
          value={add.addressTo}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleAddChange.bind(this, 'addressTo')}
        />
        <br />
        <TextField
          id="standard-search"
          label="addressForm"
          className="textField"
          value={add.addressForm}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleAddChange.bind(this, 'addressForm')}
        />
        <br />
        <TextField
          id="datetime-local"
          label="Setting a date"
          type="datetime-local"
          defaultValue={new Date().toDateString()}
          className="textField"
          InputLabelProps={{
            shrink: true,
          }}
          value={add.date}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleAddChange.bind(this, 'date')}
        />
        <br />
        <br />
        <br />
        <Button
          onClick={() => {
            onAdded(add);
            setAdd({
              name: '',
              phone: '',
              email: '',
              addressForm: '',
              addressTo: '',
              date: '',
            });
          }}
          variant="outlined"
          color="primary"
          endIcon={<PlaylistAddIcon />}
        >
          add new delivery
        </Button>
      </form>
    );
  }

  return (
    <div>
      <Helmet>
        <title>AddDelivery</title>
        <meta name="description" content="Description of AddDelivery" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <div className="AddingDiv">{AddingToList()}</div>
    </div>
  );
}

AddDelivery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  onAdded: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addDelivery: makeSelectAddDelivery(),
});

function mapDispatchToProps(dispatch) {
  return {
    onAdded: delivery => dispatch(addDelivery(delivery)),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddDelivery);
