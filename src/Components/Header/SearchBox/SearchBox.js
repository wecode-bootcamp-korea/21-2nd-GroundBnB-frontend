import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SelectDate from './SelectDate/SelectDate';
import GuestInput from './GuestInput/GuestInput';
import LocationInput from './LocationInput/LocationInput';

function SearchBox({ isSearch, toggleSearchOpen }) {
  const history = useHistory();
  const [inputValue, setInputValue] = useState('');
  const [checkDate, setCheckDate] = useState({
    checkIn: '',
    checkOut: '',
  });

  const [person, setPerson] = useState({
    adult: 0,
    child: 0,
    baby: 0,
  });

  const handleDate = (start, end) => {
    setCheckDate({
      checkIn: start,
      checkOut: end,
    });
  };

  const plusCount = (type) => {
    const count = person[type];

    if (count < 16) setPerson({ ...person, [type]: person[type] + 1 });
  };

  const minusCount = (type) => {
    const count = person[type];

    if (count > 0) setPerson({ ...person, [type]: person[type] - 1 });
  };

  const submitSearch = (e) => {
    e.preventDefault();

    history.push(
      `/result?search=${inputValue}&checkIn=${checkDate.checkIn}&checkOut=${checkDate.checkOut}&adult=${person.adult}&child=${person.child}&baby=${person.baby}`,
    );

    toggleSearchOpen();
    setCheckDate({
      checkIn: '',
      checkOut: '',
    });
    setPerson({
      adult: 0,
      child: 0,
      baby: 0,
    });
  };

  return (
    <>
      {isSearch ? (
        <SearchBarWrap>
          <SearchForm onSubmit={submitSearch}>
            <SelectTaps>
              <label htmlFor="dom">
                <input type="radio" id="dom" defaultChecked name="tap" />
                <SelectTxt>숙소</SelectTxt>
              </label>

              <label htmlFor="experience">
                <input type="radio" id="experience" name="tap" />
                <SelectTxt>체험</SelectTxt>
              </label>

              <label htmlFor="online">
                <input type="radio" id="online" name="tap" />
                <SelectTxt>온라인 체험</SelectTxt>
              </label>
            </SelectTaps>
            <SearchBarContainer>
              <SearchBar>
                <LocationInput setInputValue={setInputValue} />
                <VLine />
                <SelectDate
                  reservationInfo={checkDate}
                  handleReservationInfo={handleDate}
                />
                <VLine />
                <GuestInput
                  person={person}
                  plusCount={plusCount}
                  minusCount={minusCount}
                />
                <SearchBarBtn type="submit">
                  <SearchSubmitIcon className="fas fa-search" fontSize={20} />
                </SearchBarBtn>
              </SearchBar>
            </SearchBarContainer>
          </SearchForm>
        </SearchBarWrap>
      ) : (
        <SearchWrap>
          <BtnWrap>
            <SearchBtn type="button" onClick={toggleSearchOpen}>
              <SearchTxt>검색 시작하기</SearchTxt>
              <SearchIcon className="fas fa-search" />
            </SearchBtn>
          </BtnWrap>
        </SearchWrap>
      )}
    </>
  );
}

SearchBox.propTypes = {
  isSearch: PropTypes.bool.isRequired,
  toggleSearchOpen: PropTypes.func.isRequired,
};
export default SearchBox;

const SearchWrap = styled.div`
  border: 1px solid #ddd;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);
`;

const BtnWrap = styled.div`
  ${(props) => props.theme.FlexSet(null, 'center')}
  text-align: 'center';
  overflow: hidden;
`;

const SearchBtn = styled.button`
  ${(props) => props.theme.FlexSet('space-between', 'center')}
  width: 300px;
  padding-left: 8px;
  border: 1px solid transparent;
  background: transparent;
  box-shadow: 0px 1px 2px rgb(0 0 0 / 8%), 0px 4px 12px rgb(0 0 0 / 5%);
`;

const SearchTxt = styled.p`
  flex: 1;
  padding: 0 16px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const SearchIcon = styled.i`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '14px')};
  margin: 7px 7px 7px 0;
  padding: 10px;
  border-radius: 50%;
  background-color: #ff385c;
  color: white;
`;

const SearchBarWrap = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  height: 180px;
  padding: 0 80px;
  background: #fff;
  transform: translateX(-50%);
  z-index: -1;
`;

const SearchForm = styled.form`
  margin: 0 auto;
  max-width: 850px;
`;

const SelectTaps = styled.div`
  ${(props) => props.theme.FlexSet('center', 'center')}
  height: 80px;
  z-index: 2;
  input {
    position: absolute;
    visibility: hidden;

    &:checked + span::before {
      transform: scaleX(1);
    }
  }
`;

const SelectTxt = styled.span`
  position: relative;
  display: inline-block;
  padding: 10px 16px;
  color: #222222;
  font-size: 16px;
  line-height: 20px;
  z-index: 2;

  &::before {
    position: absolute;
    left: 50%;
    bottom: 0;
    display: block;
    content: '';
    width: 18px;
    height: 2px;
    margin-left: -9px;
    border-radius: 1px;
    background-color: black;
    transform: scaleX(0);
    transition: transform 0.2s cubic-bezier(0, 0, 0.1, 1);
  }

  &:hover::before {
    transform: scaleX(0.2);
  }
`;

const SearchBarContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 66px;
  border: 1px solid #dddddd;
  border-radius: 32px;
  color: rgb(34, 34, 34);
  background-color: rgb(247, 247, 247);
`;

const SearchBar = styled.div`
  display: flex;
  flex: 1 1 0%;
  height: 100%;
  min-width: 0px;
  pointer-events: auto;
`;

const VLine = styled.div`
  position: relative;
  top: 50%;
  margin-top: -16px;
  width: 1px;
  height: 32px;
  background-color: #dddddd;
  z-index: 0;
`;

const SearchBarBtn = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
`;

const SearchSubmitIcon = styled.i`
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '14px')};
  margin: 7px 7px 7px 0;
  padding: 10px;
  border-radius: 50%;
  background-color: #ff385c;
  color: white;
  z-index: 10px;
`;
