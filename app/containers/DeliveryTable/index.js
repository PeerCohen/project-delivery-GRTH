import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import 'react-table-v6/react-table.css';
import Popover from '@material-ui/core/Popover';
import PinDropIcon from '@material-ui/icons/PinDrop';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
import DeliveryDetalis from '../../components/DeliveryDetails';
import privteHOC from '../../HOC/private';
import makeSelectDeliveryTable from './selectors';

import Map from '../../components/Map';
import './index.scss';
export function DeliveryTable({
  listDelivery,
  onSelectDelivery,
  currentDelivery,
  onUpdateDelivery,
  onUpdateDeliveryField,
  onDeleteDelivery,
  ...props
}) {
  const [anchorEl, setAnchorEl] = useState(false);
  const [rowDateils, setRow] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDetalis, setOpenDetalis] = useState(false);
  const [openMap, setOpenMap] = useState(false);
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
    setAnchorEl(false);
  };

  const id = anchorEl && 'simple-popover';
  const handleClickOpenMap = () => {
    setOpenMap(true);
  };

  function Columns() {
    return [
      {
        accessor: 'id',
        width: 'max-content',
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
            <ButtonGroup
              color="primary"
              aria-label="outlined primary button group"
              size="large"
            >
              <Tooltip title="Edit">
                <Button
                  className="editButton"
                  endIcon={<EditIcon color="primary" fontSize="large" />}
                  onClick={() => {
                    onSelectDelivery(row.original.id);
                    setOpenDialog(true);
                  }}
                />
              </Tooltip>

              <Tooltip title="Delete">
                <Button
                  className="deleteButton"
                  onClick={() => onDeleteDelivery(row.index)}
                  endIcon={<DeleteIcon color="action" fontSize="large" />}
                />
              </Tooltip>

              <Tooltip title="See the map at the bottom of the page ">
                <Button
                  className="mapButton"
                  onClick={() => {
                    handelSetRowData(row.original);
                    handleClickOpenMap();
                  }}
                  endIcon={<RoomIcon fontSize="large" color="secondary" />}
                />
              </Tooltip>
              <Tooltip title="more details">
                <Button
                  onClick={() => {
                    onSelectDelivery(row.original.id);
                    setOpenDetalis(true);
                  }}
                  endIcon={<MoreVertIcon color="primary" fontSize="large" />}
                />
              </Tooltip>
            </ButtonGroup>
          </div>
        ),
      },
    ];
  }
  return (
    <div>
      <Button
        className="buttomAdding"
        variant="contained"
        color="primary"
        size="large"
        onClick={() => props.history.push('/AddDelivery')}
        endIcon={<PlaylistAddIcon fontSize="large" />}
      >
        Add new delivery
      </Button>
      <ReactTable
        getTdProps={(state, rowInfo, column) => ({
          onClick: () => {
            console.log('It was in this row:', rowInfo);
            console.log('It was in this column:', column);
            handleClick(rowInfo.original, column);
          },
        })}
        defaultPageSize={10}
        data={listDelivery}
        columns={Columns()}
      />
      {openDialog && currentDelivery && (
        <Editdelivery
          currentDelivery={currentDelivery}
          onUpdateDelivery={onUpdateDelivery}
          onUpdateDeliveryField={onUpdateDeliveryField}
          openDialog={openDialog}
          closeDialog={setOpenDialog}
        />
      )}
      {openDetalis && currentDelivery && (
        <DeliveryDetalis
          currentDelivery={currentDelivery}
          openDetalis={openDetalis}
          closeDetails={setOpenDetalis}
        />
      )}
      {openMap && (
        <div>
          <Map row={rowDateils} />
        </div>
      )}
      <Popover
        id={id}
        open={anchorEl}
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
          <div>
            <MoreHorizIcon color="secondary" /> num delivery :
            {rowDateils && rowDateils.id}
          </div>
          <PinDropIcon color="secondary" /> Destination location :
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
//const HOC = privteHOC(DeliveryTable);
export default compose(
  withConnect,
  memo,
  //HOC,
)(DeliveryTable);
