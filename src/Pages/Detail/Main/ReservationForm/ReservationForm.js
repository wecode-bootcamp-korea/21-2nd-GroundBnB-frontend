import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import HeadCount from './HeadCount/HeadCount';
import CalendarModal from './CalendarModal/CalendarModal';

function ReservationForm({
  price,
  pointAverage,
  reviewCount,
  handleReservationInfo,
  reservationInfo,
  setIsClickedCommentButton,
  requestReservation,
  handleReservationGuest,
}) {
  const [isClickedCountButton, setIsClickedCountButton] = useState(false);
  const [isClickedReservationBtn, setIsClickedReservationBtn] = useState(false);
  const [isClickedModal, setIsClickedModal] = useState(false);
  const [dates, setDates] = useState({
    checkIn: '',
    checkOut: '',
  });

  useEffect(() => {
    setDates({
      checkIn: reservationInfo.checkIn,
      checkOut: reservationInfo.checkOut,
    });
  }, []);

  const handleDates = (start, end) => {
    setDates({
      ...dates,
      checkIn: start,
      checkOut: end,
    });
  };

  const handleClickButton = (e) => {
    if (e.target.name === 'reservation') {
      setIsClickedReservationBtn(true);
      requestReservation();
      return;
    }
    if (e.target.name === 'review') {
      setIsClickedCommentButton((prev) => !prev);
      return;
    }

    setIsClickedCountButton((prev) => !prev);
  };

  const handleClickInput = () => {
    setIsClickedModal(true);
  };

  return (
    <Form>
      <FormMain>
        <FormMainHeader
          dates={reservationInfo.checkIn && reservationInfo.checkOut}
        >
          {reservationInfo.checkIn && reservationInfo.checkOut ? (
            <div>
              <PriceSpan>{`₩${Number(price).toLocaleString()}`} </PriceSpan>
              <span>/ 박</span>
            </div>
          ) : (
            <div>
              <h1>요금을 확인하려면 날짜를 입력하세요.</h1>
            </div>
          )}
          <ReviewScore>
            <span>★</span>
            <span>{pointAverage}</span>
            <button
              type="button"
              name="review"
              onClick={handleClickButton}
            >{`(후기 ${reviewCount}개)`}</button>
          </ReviewScore>
        </FormMainHeader>
        <FormMainBody>
          <InfoContainer>
            <DateContainer>
              {isClickedModal && (
                <CalendarModal
                  reservationInfo={reservationInfo}
                  handleReservationInfo={handleReservationInfo}
                  handleReservationGuest={handleReservationGuest}
                  setIsClickedModal={setIsClickedModal}
                  handleDates={handleDates}
                />
              )}
              <CheckIn>
                <span>체크인</span>
                <DateInput
                  value={reservationInfo.checkIn}
                  placeholder="날짜 추가"
                  onClick={handleClickInput}
                  name="checkIn"
                />
              </CheckIn>
              <CheckOut>
                <span>체크아웃</span>
                <DateInput
                  value={reservationInfo.checkOut}
                  placeholder="날짜 추가"
                  onClick={handleClickInput}
                  name="checkOut"
                />
              </CheckOut>
            </DateContainer>
            <PersonnelContainer onClick={handleClickButton}>
              <Personnel>
                <span>인원</span>
                <div>
                  <span>
                    게스트 {reservationInfo.adult + reservationInfo.kids}명
                  </span>
                  {reservationInfo.baby > 0 && (
                    <span>, 유아 {reservationInfo.baby}명</span>
                  )}
                </div>
              </Personnel>
              <Chevron type="button">
                {isClickedCountButton ? (
                  <i className="fas fa-chevron-up" />
                ) : (
                  <i className="fas fa-chevron-down" />
                )}
              </Chevron>
            </PersonnelContainer>
            {isClickedCountButton && (
              <HeadCount
                reservationInfo={reservationInfo}
                handleReservationGuest={handleReservationGuest}
                setIsClickedCountButton={setIsClickedCountButton}
              />
            )}
          </InfoContainer>
          <ReservationContainer>
            <button
              type="button"
              onClick={handleClickButton}
              name="reservation"
            >
              예약하기
            </button>
            {reservationInfo.reservationCompleted && (
              <SuccessMessage>예약이 가능합니다.</SuccessMessage>
            )}
            {reservationInfo.reservationFailed && (
              <ErrorMessage>예약이 불가능합니다.</ErrorMessage>
            )}
            {reservationInfo.checkIn && reservationInfo.checkOut && (
              <span>예약 확정 전에는 요금이 청구되지 않습니다.</span>
            )}
          </ReservationContainer>
          {reservationInfo.checkIn && reservationInfo.checkOut && (
            <ReservationPriceContainer>
              <span>
                {`₩${Number(price).toLocaleString()} x `}
                {moment(reservationInfo.checkOut).diff(
                  moment(reservationInfo.checkIn),
                  'days',
                )}
                박
              </span>
              <span>
                {`₩${(
                  Number(price) *
                  moment(reservationInfo.checkOut).diff(
                    moment(reservationInfo.checkIn),
                    'days',
                  )
                ).toLocaleString()}`}
              </span>
            </ReservationPriceContainer>
          )}
        </FormMainBody>
      </FormMain>
      {reservationInfo.checkIn && reservationInfo.checkOut && (
        <FormResult>
          <span>총 합계</span>
          <span>
            {`₩${(
              Number(price) *
              moment(reservationInfo.checkOut).diff(
                moment(reservationInfo.checkIn),
                'days',
              )
            ).toLocaleString()}`}
          </span>
        </FormResult>
      )}
    </Form>
  );
}

ReservationForm.propTypes = {
  price: PropTypes.string.isRequired,
  pointAverage: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  reservationInfo: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    adult: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    baby: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired,
    reservationSuccess: PropTypes.bool.isRequired,
  }).isRequired,
  handleReservationInfo: PropTypes.func.isRequired,
  setIsClickedCommentButton: PropTypes.func.isRequired,
  requestReservation: PropTypes.func.isRequired,
  handleReservationGuest: PropTypes.func.isRequired,
};

export default ReservationForm;

const Form = styled.form`
  position: sticky;
  top: 100px;
  left: 0;
  width: 35%;
  min-width: 350px;
  padding: 25px;
  margin: 50px 0 0 30px;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  color: #434343;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
`;

const FormMain = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormMainHeader = styled.div`
  display: flex;
  flex-direction: ${(props) => !props.dates && 'column'};
  justify-content: space-between;
  align-items: ${(props) => (props.dates ? 'center' : 'flex-start')};

  div {
    margin-top: 10px;
  }
`;

const PriceSpan = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const ReviewScore = styled.div`
  font-size: 15px;

  span {
    margin-right: 5px;
  }
  span:nth-child(1) {
    color: red;
  }

  span:nth-child(2) {
    font-weight: 600;
  }

  button {
    color: grey;
    text-decoration: underline;

    :hover {
      cursor: pointer;
    }
  }
`;

const FormMainBody = styled.div`
  margin-top: 30px;
`;

const InfoContainer = styled.div`
  border: 1px solid #bbbbbb;
  border-radius: 10px;
`;

const DateContainer = styled.div`
  display: flex;
  height: 50px;
`;

const DateInput = styled.input`
  width: 100%;
  height: 100%;
`;

const CheckIn = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 10px 5px 10px;
  border-right: 1px solid #bbbbbb;

  span {
    font-size: 11px;
    font-weight: 600;
  }
`;

const CheckOut = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 10px 5px 10px;

  span {
    font-size: 11px;
    font-weight: 600;
  }
`;

const PersonnelContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 10px;
  border-top: 1px solid #bbbbbb;

  :hover {
    cursor: pointer;
  }
`;

const Personnel = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 11px;
    font-weight: 600;
  }

  div {
    display: flex;
    align-items: center;

    span {
      margin-top: 1px;
      color: black;
      font-size: 13px;
      font-weight: 500;
    }
  }
`;

const Chevron = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReservationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;

  button {
    width: 100%;
    height: 50px;
    margin: 25px 0 20px 0;
    border-radius: 10px;
    color: white;
    background: #e61f51;
    font-size: 16px;

    :hover {
      cursor: pointer;
    }
  }

  span {
    font-size: 14px;
  }
`;

const ReservationPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0 5px 0;

  span {
    font-size: 15px;
  }
`;

const FormResult = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0;
  padding-top: 20px;
  border-top: 1px solid #dfdfdf;

  span:nth-child(2) {
    font-weight: 600;
  }
`;

const ErrorMessage = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: red;
`;

const SuccessMessage = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: black;
`;
