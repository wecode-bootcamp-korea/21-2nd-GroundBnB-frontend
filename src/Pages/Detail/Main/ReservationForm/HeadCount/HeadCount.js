import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function HeadCount({
  reservationInfo,
  handleReservationGuest,
  setIsClickedCountButton,
}) {
  const handleClickButton = (e) => {
    switch (e.target.name) {
      case 'adultMinus':
        if (reservationInfo.adult - 1 < 0) return;
        handleReservationGuest('adult', reservationInfo.adult - 1);
        break;
      case 'adultPlus':
        handleReservationGuest('adult', reservationInfo.adult + 1);
        break;
      case 'kidsMinus':
        if (reservationInfo.kids - 1 < 0) return;
        handleReservationGuest('kids', reservationInfo.kids - 1);
        break;
      case 'kidsPlus':
        handleReservationGuest('kids', reservationInfo.kids + 1);
        break;
      case 'babyMinus':
        if (reservationInfo.baby - 1 < 0) return;
        handleReservationGuest('baby', reservationInfo.baby - 1);
        break;
      case 'babyPlus':
        handleReservationGuest('baby', reservationInfo.baby + 1);
        break;
      case 'close':
        setIsClickedCountButton((prev) => !prev);
        break;

      default:
        break;
    }
  };

  return (
    <Form>
      <FormList>
        <div>
          <span>성인</span>
        </div>
        <div>
          <button type="button" name="adultMinus" onClick={handleClickButton}>
            -
          </button>
          <span>{reservationInfo.adult}</span>
          <button type="button" name="adultPlus" onClick={handleClickButton}>
            +
          </button>
        </div>
      </FormList>
      <FormList>
        <div>
          <span>어린이</span>
          <span>만 2~12세</span>
        </div>
        <div>
          <button type="button" name="kidsMinus" onClick={handleClickButton}>
            -
          </button>
          <span>{reservationInfo.kids}</span>
          <button type="button" name="kidsPlus" onClick={handleClickButton}>
            +
          </button>
        </div>
      </FormList>
      <FormList>
        <div>
          <span>유아</span>
          <span>만 2세 미만</span>
        </div>
        <div>
          <button type="button" name="babyMinus" onClick={handleClickButton}>
            -
          </button>
          <span>{reservationInfo.baby}</span>
          <button type="button" name="babyPlus" onClick={handleClickButton}>
            +
          </button>
        </div>
      </FormList>
      <Message>
        <span>최대 2명. 유아는 숙박인원에 포함되지 않습니다.</span>
      </Message>
      <ButtonWrapper>
        <button type="button" name="close" onClick={handleClickButton}>
          닫기
        </button>
      </ButtonWrapper>
    </Form>
  );
}

HeadCount.propTypes = {
  reservationInfo: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    adult: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    baby: PropTypes.number.isRequired,
  }).isRequired,
  setIsClickedCountButton: PropTypes.func.isRequired,
  handleReservationGuest: PropTypes.func.isRequired,
};

export default HeadCount;

const Form = styled.div`
  position: absolute;
  top: 218px;
  left: 20px;
  width: calc(100% - 40px);
  padding: 10px;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  background: #fff;
  font-size: 15.5px;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
`;

const FormList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 30px 0 40px 0;

  div:nth-child(1) {
    display: flex;
    flex-direction: column;

    span:nth-child(2) {
      margin-top: 8px;
      color: grey;
      font-size: 12px;
    }
  }

  button {
    width: 30px;
    height: 30px;
    margin: 0 10px;
    padding-bottom: 2px;
    border: 1px solid lightgrey;
    border-radius: 50%;
    color: #565656;
    font-size: 20px;

    :hover {
      cursor: pointer;
    }
  }

  button:nth-child(2) {
  }
`;

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  span {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    width: 50px;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
    text-decoration: underline;

    :hover {
      cursor: pointer;
    }
  }
`;
