/**
 *
 * DeliveryList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectdelivery,
  makeSelectcurrentDelivery,
} from 'containers/App/selectors';
import {
  updateDelivery,
  addDelivery,
  deleteDelivery,
  getDelivery,
} from 'containers/App/actions';
import history from 'utils/history';
import AddDelivery from 'containers/AddDelivery/Loadable';
import AddIcon from '@material-ui/icons/Add';
import makeSelectDeliveryList from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DeliveryList(
  listDelivery,
  currentDelivery,
  onSelectDelivery,
  // onUpdateDelivery,
  // onAddDelivery,
  // onDeleteDelivery,
  // onGetDelivery
) {
  useInjectReducer({ key: 'deliveryList', reducer });
  useInjectSaga({ key: 'deliveryList', saga });
  function rowSelected(d) {
    const currentDeliveryId = currentDelivery ? currentDelivery.id : '';
    if (d.id === currentDeliveryId) return;
    onSelectDelivery(d.id);
  }
  // function renderdelivery() {
  //   const currentDeliveryId = currentDelivery ? currentDelivery.id : '';
  //   return listDelivery.map(d => (
  //     <div key={d.id} className={d.id === currentDeliveryId ? 'selected' : ''}>
  //       <Button
  //         onClick={() => {
  //           rowSelected(d);
  //         }}
  //       >
  //         Click me
  //       </Button>
  //       {d.id}
  //       {d.name}
  //     </div>
  //   ));
  // }
  function renderCurrentDelivery() {
    return (
      <div>
        <h3>list:</h3>
        <div>{currentDelivery.name}</div>
        <div>{currentDelivery.name}</div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>DeliveryList</title>
        <meta name="description" content="Description of DeliveryList" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <br />
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => history.push('/AddDelivery')}
        endIcon={<AddIcon color="action" fontSize="large" />}
      >
        Add new delivery
      </Button>
      {listDelivery && <div className="container-listDelivery" />}
      {listDelivery && (
        <div className="container-listDelivery">{renderCurrentDelivery()}</div>
      )}
    </div>
  );
}

DeliveryList.propTypes = {
  listDelivery: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  currentDelivery: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSelectDelivery: PropTypes.func,
  onUpdateDelivery: PropTypes.func,
  onAddDelivery: PropTypes.func,
  onDeleteDelivery: PropTypes.func,
  onGetDelivery: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  deliveryList: makeSelectDeliveryList(),
  listDelivery: makeSelectdelivery(),
  currentDelivery: makeSelectcurrentDelivery(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectDelivery: idDelivery => dispatch(getDelivery(idDelivery)),
    onUpdateDelivery: delivery => dispatch(updateDelivery(delivery)),
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
)(DeliveryList);
