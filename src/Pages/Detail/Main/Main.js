import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Facilities from './Facilities/Facilities';
import Calendar from '../../../Components/Calendar/Calendar';
import Comments from './Review/Comments/Comments';
import ReservationForm from './ReservationForm/ReservationForm';
import Description from './Description/Description';
import Map from '../../../Components/Map/Map';

function Main({
  hostName,
  profileImage,
  maxPeople,
  roomOptions,
  description,
  roomConvenience,
  reviews,
  points,
  pointAverage,
  reviewCount,
  price,
  rooms,
  reservationInfo,
  handleReservationInfo,
  setIsClickedDescriptionButton,
  setIsClickedCommentButton,
  requestReservation,
  handleReservationGuest,
}) {
  const handleClickButton = (e) => {
    if (
      e.target.parentNode.name === 'descriptionButton' ||
      e.target.name === 'descriptionButton'
    ) {
      setIsClickedDescriptionButton((prev) => !prev);
    } else {
      setIsClickedCommentButton((prev) => !prev);
    }
  };

  return (
    <>
      <MainContainer>
        <TopWrapper>
          <LeftWrapper>
            <Title>
              <TitleText>
                <h3>
                  {hostName}
                  님이 호스팅하는 콘도전체
                </h3>
                <span>{`최대 인원 ${maxPeople}명 • `}</span>
                {roomOptions.map((option, index) => {
                  if (index === roomOptions.length - 1) {
                    return (
                      <span key={index}>{`${
                        option.name + option.quantity
                      }개`}</span>
                    );
                  }
                  return (
                    <span key={index}>{`${
                      option.name + option.quantity
                    }개 • `}</span>
                  );
                })}
              </TitleText>
              <TitleImage>
                <img alt="#" src={profileImage} />
              </TitleImage>
            </Title>
            <DescriptionWrapper>
              <Description description={description} />
              <div>
                <button
                  type="button"
                  onClick={handleClickButton}
                  name="descriptionButton"
                >
                  <span>더 보기</span>
                  <i className="fas fa-chevron-right" />
                </button>
              </div>
            </DescriptionWrapper>
            <Facilities roomConvenience={roomConvenience} />
            <Calendar
              handleReservationInfo={handleReservationInfo}
              reservationInfo={reservationInfo}
            />
          </LeftWrapper>
          <RightWrapper>
            <ReservationForm
              price={price}
              pointAverage={pointAverage}
              reviewCount={reviewCount}
              handleReservationInfo={handleReservationInfo}
              reservationInfo={reservationInfo}
              setIsClickedCommentButton={setIsClickedCommentButton}
              requestReservation={requestReservation}
              handleReservationGuest={handleReservationGuest}
            />
          </RightWrapper>
        </TopWrapper>
        <Comments
          pointAverage={pointAverage}
          points={points}
          reviews={reviews}
          reviewCount={reviewCount}
          setIsClickedCommentButton={setIsClickedCommentButton}
        />
        <CommentButtonWrapper>
          <CommentButton
            type="button"
            onClick={handleClickButton}
          >{`후기 ${reviewCount}개 모두 보기`}</CommentButton>
        </CommentButtonWrapper>
        <Map rooms={rooms} />
      </MainContainer>
    </>
  );
}

Main.propTypes = {
  hostName: PropTypes.string.isRequired,
  profileImage: PropTypes.string.isRequired,
  maxPeople: PropTypes.number.isRequired,
  roomOptions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  roomConvenience: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      exist: PropTypes.number.isRequired,
    }),
  ).isRequired,
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      review_id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      point: PropTypes.number.isRequired,
    }),
  ).isRequired,
  pointAverage: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  reservationInfo: PropTypes.shape({
    checkIn: PropTypes.string.isRequired,
    checkOut: PropTypes.string.isRequired,
    adult: PropTypes.number.isRequired,
    kids: PropTypes.number.isRequired,
    baby: PropTypes.number.isRequired,
  }).isRequired,
  handleReservationInfo: PropTypes.func.isRequired,
  setIsClickedDescriptionButton: PropTypes.func.isRequired,
  setIsClickedCommentButton: PropTypes.func.isRequired,
  requestReservation: PropTypes.func.isRequired,
  handleReservationGuest: PropTypes.func.isRequired,
};

export default Main;

const MainContainer = styled.div`
  position: relative;
  padding-bottom: 30px;
  border-bottom: 1px solid #dfdfdf;
`;

const TopWrapper = styled.div`
  display: flex;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 65%;
  padding: 50px 50px 30px 0;
`;

const RightWrapper = styled.div`
  padding-bottom: 30px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 30px;
  border-bottom: 1px solid #dfdfdf;
`;

const TitleText = styled.div`
  font-size: 24px;

  span {
    font-size: 15px;
  }
`;

const TitleImage = styled.div`
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 0;
  border-bottom: 1px solid #dfdfdf;

  div {
    margin-top: 30px;

    span {
      margin-right: 5px;
    }
  }

  div:nth-child(1) {
    width: 100%;
    height: 200px;
    margin: 0;
    padding: 30px 0;
    overflow: hidden;
  }

  div:nth-child(2) {
    button {
      width: 60px;
      padding: 0;
      font-size: 15px;
      font-weight: 600;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

const CommentButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 40px;
  border-bottom: 1px solid #dfdfdf;
`;

const CommentButton = styled.button`
  width: 150px;
  height: 50px;
  margin-bottom: 30px;
  border: 1px solid black;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;

  :hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.3);
  }
`;
