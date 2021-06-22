import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ReviewBar({ point }) {
  return (
    <ReviewBarWrapper>
      <OuterBar />
      <InnerBar point={point} />
    </ReviewBarWrapper>
  );
}

ReviewBar.propTypes = {
  point: PropTypes.number.isRequired,
};

export default ReviewBar;

const ReviewBarWrapper = styled.div`
  position: relative;
  width: 120px;
  /* min-width: 200px; */
  height: 4px;
  margin: 0 30px 5px 0;
`;

const OuterBar = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #dfdfdf;
`;

const InnerBar = styled.div`
  position: absolute;
  top: 0;
  width: ${(props) => (props.point / 5) * 120}px;
  height: 100%;
  background: black;
`;
