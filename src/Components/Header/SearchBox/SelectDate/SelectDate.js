import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Calendar from '../../../Calendar/Calendar';

const SelectDate = ({ reservationInfo, handleReservationInfo }) => {
  const calendarWrapperRef = useRef(null);
  const [isOpenedCalendar, setIsOpenedCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleClickOutside = (e) => {
    const calendarWrapper = calendarWrapperRef.current;

    if (
      !calendarWrapper?.contains(e.target) &&
      e.target.name !== 'checkIn' &&
      e.target.name !== 'checkOut'
    ) {
      setIsOpenedCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCheckInDate(reservationInfo.checkIn);
    setCheckOutDate(reservationInfo.checkOut);
  }, [reservationInfo]);

  const handleBlurInput = (e) => {
    if (e.target.name === 'checkIn') {
      handleReservationInfo(e.target.value, checkOutDate);
    } else {
      handleReservationInfo(checkInDate, e.target.value);
    }
  };

  const handleChangeInput = (e) => {
    if (e.target.name === 'checkIn') {
      setCheckInDate(e.target.value);
    } else {
      setCheckOutDate(e.target.value);
    }
  };

  const handleClickSearchContents = (e) => {
    if (e.target.name === 'checkIn') {
      setIsOpenedCalendar(true);
      return;
    }
    if (e.target.name === 'checkOut') {
      setIsOpenedCalendar(true);
    }
  };

  return (
    <DateWrap>
      {isOpenedCalendar && (
        <CalendarWrapper ref={calendarWrapperRef}>
          <Calendar
            reservationInfo={reservationInfo}
            handleReservationInfo={handleReservationInfo}
          />
        </CalendarWrapper>
      )}
      <SearchContents onClick={handleClickSearchContents} name="checkIn">
        <SP name="checkIn">체크인</SP>
        <SelectBarInput
          placeholder="날짜 입력"
          name="checkIn"
          value={checkInDate}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
        />
      </SearchContents>
      <VLine />
      <SearchContents onClick={handleClickSearchContents} name="checkOut">
        <SP name="checkOut">체크아웃</SP>
        <SelectBarInput
          placeholder="날짜 입력"
          name="checkOut"
          value={checkOutDate}
          onChange={handleChangeInput}
          onBlur={handleBlurInput}
        />
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

const CalendarWrapper = styled.div`
  position: absolute;
  top: 80px;
  left: -160px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 700px;
  padding-left: 45px;
  border: 1px solid #dfdfdf;
  border-radius: 30px;
  background: white;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
`;

const SelectBarInput = styled.input`
  /* font-size: 14px;
  line-height: 18px;
  color: #717171;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis; */
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
