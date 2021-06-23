import React  from 'react';
import PropTypes from "prop-types";

function Country(props) {
  return (
    <div className="country">
      <span>{props.name}</span>
    </div>
  );
}

Country.propTypes = {
  name: PropTypes.string.isRequired
};

export default Country;