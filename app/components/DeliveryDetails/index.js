import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import messages from './messages';
import './index.scss';

const newLocal = (
  <a
    href="https://waze.com/ul?ll=45.6906304,-120.810983&z=10
    "
    target="_blank"
  >
    Open in Waze
  </a>
);
function DeliveryDetails({ currentDelivery, openDetalis, closeDetails }) {
  const handleClose = () => {
    closeDetails();
  };
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <Dialog
        open={openDetalis}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle edge="end" id="form-dialog-title" className="dialogTitle">
          <IconButton edge="start" aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <div>Delivery's information</div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {newLocal}
            <div> Number delivery: {currentDelivery.id}</div>
            <div> name: {currentDelivery.name}</div>
            <div> Phone: {currentDelivery.phone}</div>
            <div> email: {currentDelivery.email}</div>
            <div> address Form: {currentDelivery.addressForm}</div>
            <div> address To: {currentDelivery.addressTo}</div>
            <div> date of delivery: {currentDelivery.registered}</div>
            <div> kind of delivery: {currentDelivery.about}</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions />
      </Dialog>
    </div>
  );
}

DeliveryDetails.propTypes = {
  currentDelivery: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  openDetalis: PropTypes.bool,
  closeDetails: PropTypes.func,
};

export default memo(DeliveryDetails);
