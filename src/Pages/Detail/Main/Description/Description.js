import React from 'react';
import PropTypes from 'prop-types';

function Description({ description }) {
  return (
    <div>
      {description.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          <p>{line}</p>
          <br />
          <br />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
};

export default Description;
