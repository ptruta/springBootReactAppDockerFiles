import React  from 'react';
import PropTypes from "prop-types";

function Grocery(props) {
  return (
    <div className="grocery">
      <span>{props.name}</span>
    </div>
  );
}

Grocery.propTypes = {
  name: PropTypes.string.isRequired
};

export default Grocery;