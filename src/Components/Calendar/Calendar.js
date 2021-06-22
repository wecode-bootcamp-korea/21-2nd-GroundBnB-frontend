import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';
import 'moment/locale/ko';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './Calendar.css';

function Calendar({
  handleReservationInfo,
  reservationInfo,
  setStartDate,
  setEndDate,
}) {
  const [focusedInput, setFocusedInput] = useState('startDate');

  const handleDatesChange = ({ startDate, endDate }) => {
    if (startDate) {
      if (setStartDate) {
        setStartDate(startDate.format('YYYY-MM-DD'));
      }

      handleReservationInfo('checkIn', startDate.format('YYYY-MM-DD'));
    }

    if (endDate) {
      if (setEndDate) {
        setEndDate(endDate.format('YYYY-MM-DD'));
      }

      handleReservationInfo('checkOut', endDate.format('YYYY-MM-DD'));
    }
  };

  const handleFocusChange = () => {
    if (focusedInput === 'startDate') {
      setFocusedInput('endDate');
    } else {
      setFocusedInput('startDate');
    }
  };

  return (
    <CalendarWrapper>
      <DayPickerRangeController
        startDate={
          reservationInfo.checkIn ? moment(reservationInfo.checkIn) : ''
        }
        endDate={
          reservationInfo.checkOut ? moment(reservationInfo.checkOut) : ''
        }
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={handleFocusChange}
        // isDayBlocked={}
        numberOfMonths={2}
      />
    </CalendarWrapper>
  );
}

Calendar.propTypes = {
  handleReservationInfo: PropTypes.func.isRequired,
  reservationInfo: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    adult: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    baby: PropTypes.number.isRequired,
  }).isRequired,
  setStartDate: PropTypes.func.isRequired,
  setEndDate: PropTypes.func.isRequired,
};

export default Calendar;

const CalendarWrapper = styled.div`
  width: 100%;
  margin: 10px 0;
`;
