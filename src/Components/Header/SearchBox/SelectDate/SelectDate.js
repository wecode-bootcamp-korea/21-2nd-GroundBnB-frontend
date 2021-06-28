import React from 'react';
import styled from 'styled-components';

const SelectDate = () => {
  return (
    <DateWrap>
      <SearchContents>
        <SP>체크인</SP>
        <SelectBarTxt>날짜입력</SelectBarTxt>
      </SearchContents>
      <VLine />
      <SearchContents>
        <SP>체크아웃</SP>
        <SelectBarTxt>날짜입력</SelectBarTxt>
      </SearchContents>
    </DateWrap>
  );
};

export default SelectDate;

const DateWrap = styled.div`
  position: relative;
  display: flex;
  flex: 2;
  cursor: pointer;
`;

const SelectBarTxt = styled.p`
  font-size: 14px;
  line-height: 18px;
  color: #717171;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchContents = styled.div`
  position: relative;
  flex: 1;
  padding: 14px 24px;
  border-radius: 32px;
  overflow: hidden;
  white-space: nowrap;
  z-index: 1;

  &:hover {
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

const VLine = styled.div`
  position: relative;
  top: 50%;
  margin-top: -16px;
  width: 1px;
  height: 32px;
  background-color: #dddddd;
  z-index: 0;
`;
