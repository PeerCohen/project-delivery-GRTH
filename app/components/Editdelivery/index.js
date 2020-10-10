/**
 *
 * Editdelivery
 *
 */

import React, { memo } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import SaveIcon from '@material-ui/icons/Save';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Editdelivery({
  currentDelivery,
  onUpdateDelivery,
  onUpdateDeliveryField,
  closeDialog,
  openDialog
}) {
  const handleEditChange = prop => event => {
    onUpdateDeliveryField(prop, event.target.value);
  };
 

  const handleClose = () => {
    closeDialog();
  };
  return (
    <div>
      <FormattedMessage {...messages.header} />
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Delivery</DialogTitle>
        <DialogContent>
          <DialogContentText>
            setting the delivery details with desired values. We will update
            immediately.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filled-helperText"
            defaultValue={currentDelivery.email}
            onChange={handleEditChange('email')}
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            id="filled-helperText"
            autoFocus
            margin="dense"
            defaultValue={currentDelivery.name}
            label="Name"
            onChange={handleEditChange('name')}
            fullWidth
          />
          <TextField
            id="filled-helperText"
            autoFocus
            margin="dense"
            defaultValue={currentDelivery.phone}
            label="Phone"
            onChange={handleEditChange('phone')}
            fullWidth
          />
          <TextField
            id="filled-helperText"
            autoFocus
            margin="dense"
            defaultValue={currentDelivery.addressTo}
            onChange={handleEditChange('addressTo')}
            label="address To"
            fullWidth
          />
          <TextField
            id="filled-helperText"
            autoFocus
            margin="dense"
            defaultValue={currentDelivery.addressForm}
            onChange={handleEditChange('addressForm')}
            label="address Form"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onUpdateDelivery();
              handleClose();
            }}
            color="primary"
            endIcon={<SaveIcon color="action" fontSize="large" />}
          >
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Editdelivery.propTypes = {
  currentDelivery: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onUpdateDelivery: PropTypes.func,
  onUpdateDeliveryField: PropTypes.func,
};
// function mapDispatchToProps(dispatch) {
//   return {
//       dispatch(setDailogIsOpen(open));
//     },
//   };

// const withConnect = connect(
//   mapDispatchToProps,
// );

export default memo(Editdelivery);
