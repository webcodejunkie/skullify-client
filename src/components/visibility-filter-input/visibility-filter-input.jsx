import React from "react";
import { connect } from 'react-redux';

import './visibility-filter-input.scss'

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <>
    <div className="p-3">
      <h2>Search The Crypt</h2>
      <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visbilityFilter}
        placeholder="search movies"
      />
    </div>
  </>
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);