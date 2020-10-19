import React, {memo, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {compose} from 'redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {addDelivery} from 'containers/App/actions';

import makeSelectAddDelivery from './selectors';
import './index.scss';

export function AddDelivery({onAdded, history}) {
  const [newDelivery, setNewDelivery] = useState({});
  const handleAddChange = propertyName => event => {
    const delivery = {...newDelivery};
    delivery[propertyName] = event.target.value;
    setNewDelivery(delivery);
  };
  function AddingToList() {
    return (
      <>
        <span className="title">- new delivery -</span>
        <hr />
        <form noValidate>
          <TextField
            id="standard-search"
            label="Name"
            className="textField"
            value={newDelivery.name}
            onChange={handleAddChange('name')}
          />
          <TextField
            id="standard-search"
            label="email"
            className="textField"
            value={newDelivery.email}
            onChange={handleAddChange('email')}
          />
          <br />
          <TextField
            id="standard-search"
            label="phone"
            className="textField"
            value={newDelivery.phone}
            onChange={handleAddChange('phone')}
          />
          <br />
          <TextField
            id="standard-search"
            label="addressTo"
            className="textField"
            value={newDelivery.addressTo}
            onChange={handleAddChange('addressTo')}
          />
          <br />
          <TextField
            id="standard-search"
            label="addressForm"
            className="textField"
            value={newDelivery.addressForm}
            onChange={handleAddChange('addressForm')}
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
            value={newDelivery.date}
            onChange={handleAddChange('date')}
          />
          <br />
          <Button
            className="buttomAdded"
            onClick={() => {
              onAdded(newDelivery);
              history.push('/DeliveryTable');
            }}
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            add
          </Button>
        </form>
      </>
    );
  }

  return (
    <div>
      <div className="AddingDiv">{AddingToList()}</div>
    </div>
  );
}

AddDelivery.propTypes = {
  onAdded: PropTypes.func,
  history: PropTypes.any,
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
