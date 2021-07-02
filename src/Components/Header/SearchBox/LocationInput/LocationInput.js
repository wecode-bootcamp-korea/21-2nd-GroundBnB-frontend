import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { API } from '../../../../config';
// import { GET_INPUTTED_ROOMS_API } from '../../../../config';
import LocationResult from './LocationResult/LocationResult';

const LocationInput = ({ setInputValue }) => {
  const [place, setPlace] = useState('');
  const [filteredResult, setFilterResult] = useState([]);
  const [isResultShow, setIsResultShow] = useState(false);

  const toggleWhereShow = () => {
    setIsResultShow(!isResultShow);
  };

  const selectedRegion = (e) => {
    // console.log(value);
    const value = e.target.innerText;

    setInputValue(value);
    setPlace(value);
  };

  const changeInputTxt = (e) => {
    const { value } = e.target;

    setPlace(value);
    setInputValue(value);
    setIsResultShow(value.length > 0);

    value.length &&
      fetch(`${API}/searchword?search=${value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((result) => {
          setFilterResult(result.result);
        });
  };

  const handleBlurInput = () => {
    toggleWhereShow();
  };

  console.log(place);
  return (
    <>
      <WhereWrap onClick={toggleWhereShow}>
        <WhereContent>
          <WhereLabel htmlFor="where">
            <SP>위치</SP>
            <input
              id="where"
              value={place}
              onChange={changeInputTxt}
              onBlur={handleBlurInput}
              placeholder="어디로 여행가세요?"
            />
          </WhereLabel>
        </WhereContent>
      </WhereWrap>
      {isResultShow && (
        <LocationResult
          toggleWhereShow={toggleWhereShow}
          defaultLi={place.length === 0}
          datas={filteredResult}
          selectedRegion={selectedRegion}
        />
      )}
    </>
  );
};

LocationInput.propTypes = {
  setInputValue: PropTypes.func.isRequired,
};
export default LocationInput;

const WhereWrap = styled.div`
  position: relative;
  flex: 1.5;
`;

const WhereContent = styled.div`
  position: relative;
  display: flex;
  margin: -1px;
  z-index: 1;
`;

const WhereLabel = styled.label`
  display: block;
  flex: 1 0 0%;
  min-width: 0px;
  padding: 14px 32px;
  background-clip: padding-box;
  border: 1px solid transparent;
  border-radius: 32px;
  cursor: pointer;

  input {
    width: 100%;
    background: none;
    color: #222222;
    font-size: 14px;
    line-height: 18px;
    text-overflow: ellipsis;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid transparent;
    border-radius: 32px;
    background-clip: padding-box;
    z-index: -1;
  }

  &:hover::after {
    background-color: #ebebeb;
  }
`;

const SP = styled.p`
  padding-bottom: 2px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 800;
  letter-spacing: 0.04em;
  z-index: 1;
`;
