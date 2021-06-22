import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import Calendar from '../../../../../Components/Calendar/Calendar';

function CalendarModal({
  reservationInfo,
  handleReservationInfo,
  setIsClickedModal,
  handleDates,
}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const calendarModalRef = useRef(null);

  const handleClickOutside = (e) => {
    const calendarModal = calendarModalRef.current;

    if (!calendarModal.contains(e.target)) {
      setIsClickedModal((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    setStartDate(reservationInfo.checkIn);
    setEndDate(reservationInfo.checkOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickButton = () => {
    setIsClickedModal((prev) => !prev);
  };

  const handleChangeInput = (e) => {
    if (e.target.name === 'checkIn') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const handleBlurInput = (e) => {
    // 날짜 정규표현식 통과

    handleDates(e.target.name, e.target.value);
    handleReservationInfo(e.target.name, e.target.value);
  };

  return (
    <CalendarModalWrapper ref={calendarModalRef}>
      <Header>
        <Title>
          {reservationInfo.checkIn && reservationInfo.checkOut ? (
            <>
              <h1>
                {moment(reservationInfo.checkOut).diff(
                  moment(reservationInfo.checkIn),
                  'days',
                )}
                박
              </h1>
              <span>
                {`${reservationInfo.checkIn.split('-')[0]}년 ${
                  reservationInfo.checkIn.split('-')[1]
                }월 ${reservationInfo.checkIn.split('-')[2]}일 - ${
                  reservationInfo.checkOut.split('-')[0]
                }년 ${reservationInfo.checkOut.split('-')[1]}월 ${
                  reservationInfo.checkOut.split('-')[2]
                }일`}
              </span>
            </>
          ) : (
            <>
              <h1>날짜 선택</h1>
              <span>여행 날짜를 입력하여 정확한 요금을 확인하세요.</span>
            </>
          )}
        </Title>
        <DateInputWrapper>
          <CheckIn checkIn="">
            <div>
              <span>체크인</span>
              <input
                value={startDate}
                onChange={handleChangeInput}
                onBlur={handleBlurInput}
                placeholder="날짜 추가"
                name="checkIn"
              />
            </div>
            <button type="button">X</button>
          </CheckIn>
          <CheckOut checkOut="true">
            <div>
              <span>체크아웃</span>
              <input
                value={endDate}
                onChange={handleChangeInput}
                onBlur={handleBlurInput}
                placeholder="날짜 추가"
                name="checkOut"
              />
            </div>
            <button type="button">X</button>
          </CheckOut>
        </DateInputWrapper>
      </Header>
      <CalendarWrapper>
        <Calendar
          reservationInfo={reservationInfo}
          handleReservationInfo={handleReservationInfo}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </CalendarWrapper>
      <ButtonWrapper>
        <Button type="button" onClick={handleClickButton}>
          닫기
        </Button>
      </ButtonWrapper>
    </CalendarModalWrapper>
  );
}

CalendarModal.propTypes = {
  setIsClickedModal: PropTypes.func.isRequired,
  handleReservationInfo: PropTypes.func.isRequired,
  reservationInfo: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    adult: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    baby: PropTypes.number.isRequired,
  }).isRequired,
  handleDates: PropTypes.func.isRequired,
};

export default CalendarModal;

const CalendarModalWrapper = styled.div`
  position: absolute;
  top: 60px;
  left: -295px;
  width: 660px;
  padding: 30px;
  border: 1px solid #dfdfdf;
  background: #fff;
  z-index: 30;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  span {
    color: #565656;
    font-size: 14px;
  }
`;

const DateInputWrapper = styled.div`
  display: flex;
  width: 53%;
  height: 55px;
  border: 1px solid #565656;
  border-radius: 12px;
`;

const CheckIn = styled.form`
  display: flex;
  align-items: center;
  width: 50%;
  border: ${(props) => (props.checkIn ? '2px solid black' : 'none')};
  border-right: ${(props) => !props.checkIn && 'none'};
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      margin: 0 0 3px 6px;
      color: #565656;
      font-size: 11px;
      font-weight: 600;
    }

    input {
      margin-left: 6px;
      width: 80%;
      height: 40%;
    }
  }

  button {
    width: 30%;
    padding-right: 15px;
  }
`;

const CheckOut = styled.form`
  display: flex;
  align-items: center;
  width: 50%;
  border: ${(props) => (props.checkOut ? '2px solid black' : 'none')};
  border-left: ${(props) => !props.checkOut && 'none'};
  border-radius: 10px;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    span {
      margin: 0 0 3px 6px;
      color: #565656;
      font-size: 11px;
      font-weight: 600;
    }

    input {
      margin-left: 6px;
      width: 80%;
      height: 40%;
    }
  }

  button {
    width: 30%;
    padding-right: 15px;
  }
`;

const CalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  width: 70px;
  height: 40px;
  background: black;
  color: #fff;
  border-radius: 10px;

  :hover {
    cursor: pointer;
  }
`;
