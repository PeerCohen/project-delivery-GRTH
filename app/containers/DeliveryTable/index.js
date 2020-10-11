import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import 'react-table-v6/react-table.css';
import Popover from '@material-ui/core/Popover';
import PinDropIcon from '@material-ui/icons/PinDrop';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectdelivery,
  makeSelectcurrentDelivery,
} from 'containers/App/selectors';
import {
  updateDelivery,
  addDelivery,
  updateDeliveryField,
  deleteDelivery,
  getDelivery,
} from 'containers/App/actions';
import ReactTable from 'react-table-v6';
import Editdelivery from 'components/Editdelivery';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import RoomIcon from '@material-ui/icons/Room';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import saga from './saga';
import reducer from './reducer';
import makeSelectDeliveryTable from './selectors';

import Map from '../../components/Map';
import './index.scss';

export function DeliveryTable({
  listDelivery,
  onSelectDelivery,
  currentDelivery,
  onUpdateDelivery,
  onUpdateDeliveryField,
  ...props
}) {
  useInjectReducer({ key: 'deliveryTable', reducer });
  useInjectSaga({ key: 'deliveryTable', saga });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rowDateils, setRow] = React.useState();
  const handleClick = (rowData, column) => {
    if (column.Header === 'AddressTo') {
      setRow(rowData);
      setAnchorEl(true);
    }
  };
  const handelSetRowData = data => {
    setRow(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialogEdit = () => {
    setOpenDialog(true);
  };
  const closeDialog = () => {
    setOpenDialog(false);
  };
  const [openMap, setOpenMap] = React.useState(false);
  const handleClickOpenMap = () => {
    setOpenMap(true);
  };
  function useData() {
    const data =
      listDelivery &&
      listDelivery.map(delivery => ({
        id: delivery.id,
        name: delivery.name,
        phone: delivery.phone,
        addressTo: delivery.addressTo,
        latitudeFrom: delivery.latitudeFrom,
        longitudeFrom: delivery.longitudeFrom,
        latitudeTo: delivery.latitudeTo,
        longitudeTo: delivery.longitudeTo,
      }));
    return data;
  }

  function Columns() {
    return [
      {
        // show: false,
        // Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'name',
        accessor: 'name',
      },
      {
        Header: 'Phone',
        accessor: 'phone',
      },
      {
        Header: 'AddressTo',
        accessor: 'addressTo',
      },
      {
        Cell: row => (
          <div>
            <Tooltip title="Edit">
              <Button
                className="editButton"
                variant="outlined"
                color="primary"
                size="large"
                justify-content="center"
                endIcon={<EditIcon color="primary" fontSize="large" />}
                onClick={() => {
                  onSelectDelivery(row.original.id);
                  handleClickOpenDialogEdit();
                }}
              />
            </Tooltip>
            {'     '}
            <Tooltip title="Delete">
              <Button
                className="deleteButton"
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => props.onDeleteDelivery(row.index)}
                endIcon={<DeleteIcon color="action" fontSize="large" />}
              />
            </Tooltip>
            {'     '}
            <Tooltip title="See the map at the bottom of the page ">
              <Button
                className="mapButton"
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => {
                  handelSetRowData(row.original);
                  handleClickOpenMap();
                }}
                endIcon={<RoomIcon fontSize="large" color="secondary" />}
              />
            </Tooltip>
          </div>
        ),
      },
    ];
  }
  return (
    <div>
      <Button
        className="buttomAdding"
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => props.history.push('/AddDelivery')}
        endIcon={<AddIcon color="action" fontSize="large" />}
      >
        Add new delivery
      </Button>
      <ReactTable
        getTdProps={(state, rowInfo, column) => ({
          onClick: (e, handleOriginal) => {
            console.log('It was in this row:', rowInfo);
            console.log('It was in this column:', column);
            if (handleOriginal) {
              handleOriginal();
            }
            handleClick(rowInfo.original, column);
          },
        })}
        defaultPageSize={10}
        data={useData()}
        columns={Columns()}
      />
      {openDialog && (
        <Editdelivery
          currentDelivery={currentDelivery}
          onUpdateDelivery={onUpdateDelivery}
          onUpdateDeliveryField={onUpdateDeliveryField}
          openDialog={openDialog}
          closeDialog={closeDialog}
        />
      )}
      {openMap && (
        <div>
          <Map row={rowDateils} />
        </div>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography className="popup">
          <br />
          <br />
          <MoreHorizIcon color="secondary" /> num delivery :
          <br />
          {rowDateils && rowDateils.id}
          <br />
          <br />
          <PinDropIcon color="secondary" /> Destination location :
          <br />
          {rowDateils && rowDateils.addressTo}
        </Typography>
      </Popover>
    </div>
  );
}

DeliveryTable.propTypes = {
  listDelivery: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  currentDelivery: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSelectDelivery: PropTypes.func,
  onUpdateDelivery: PropTypes.func,
  onUpdateDeliveryField: PropTypes.func,
  onAddDelivery: PropTypes.func,
  onDeleteDelivery: PropTypes.func,
  onGetDelivery: PropTypes.func,
  history: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  deliveryTable: makeSelectDeliveryTable(),
  listDelivery: makeSelectdelivery(),
  currentDelivery: makeSelectcurrentDelivery(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectDelivery: idDelivery => dispatch(getDelivery(idDelivery)),
    onUpdateDelivery: delivery => {
      dispatch(updateDelivery(delivery));
    },
    onUpdateDeliveryField: (key, value) =>
      dispatch(updateDeliveryField(key, value)),
    onAddDelivery: delivery => dispatch(addDelivery(delivery)),
    onDeleteDelivery: idDelivery => dispatch(deleteDelivery(idDelivery)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DeliveryTable);
