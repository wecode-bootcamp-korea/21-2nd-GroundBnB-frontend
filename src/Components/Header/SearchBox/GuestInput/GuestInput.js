import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import WhoResult from './GuestInputResult/GuestInputResult';

const GuestInput = ({ person, plusCount, minusCount }) => {
  const [isGuestShow, setIsGuestShow] = useState(false);

  const toggleGuestShow = () => {
    setIsGuestShow(!isGuestShow);
  };

  const totalGuest = person.adult + person.child + person.baby;

  return (
    <>
      <WhoWrap onClick={toggleGuestShow}>
        <SearchContents>
          <SP>인원</SP>
          <SelectBarTxt>
            {totalGuest ? `게스트 ${totalGuest}명` : '게스트 추가'}
          </SelectBarTxt>
        </SearchContents>
      </WhoWrap>
      {isGuestShow && (
        <WhoResult
          person={person}
          plusCount={plusCount}
          minusCount={minusCount}
        />
      )}
    </>
  );
};

GuestInput.propTypes = {
  plusCount: PropTypes.func.isRequired,
  minusCount: PropTypes.func.isRequired,
};

export default GuestInput;

const WhoWrap = styled.div`
  position: relative;
  flex: 0.95;
  cursor: pointer;
  z-index: 0;
`;

const SearchContents = styled.div`
  position: relative;
  flex: 1;
  padding: 14px 24px;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;

  &:hover {
    border-radius: 32px;
    background-color: rgba(0, 0, 0, 0.05);
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

const SelectBarTxt = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #717171;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;
