import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Facilities({ roomConvenience }) {
  return (
    <Wrapper>
      <Title>
        <h3>숙소 편의시설</h3>
      </Title>
      <FacilityWrapper>
        {roomConvenience.map((convenience, index) => {
          if (convenience.exist) {
            return (
              <div key={index}>
                <span>• </span>
                <span>{convenience.name}</span>
              </div>
            );
          }
          return (
            <div key={index}>
              <span>• </span>
              <span style={{ textDecoration: 'line-through' }}>
                {convenience.name}
              </span>
            </div>
          );
        })}
      </FacilityWrapper>
    </Wrapper>
  );
}

Facilities.propTypes = {
  roomConvenience: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      exist: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Facilities;

const Wrapper = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid #dfdfdf;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const FacilityWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;

  div {
    width: 50%;
    margin: 5px 0;
  }
`;
