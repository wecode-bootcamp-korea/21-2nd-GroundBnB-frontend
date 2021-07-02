import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SlideContainer = styled.div``;

function Slider({ image }) {
  return (
    <SlideContainer>
      <div>a</div>
      <div>b</div>
      <div>c</div>
    </SlideContainer>
  );
}

Slider.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Slider;
