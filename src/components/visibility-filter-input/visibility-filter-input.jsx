import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => {
      props.setFilter(e.target.value)
      console.log(
        'visibility-filter-input.VisibilityFilterInput.e', e)
    }}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);

