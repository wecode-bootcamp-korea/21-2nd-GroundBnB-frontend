import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './Header/Header';
import Main from './Main/Main';
import ImageModal from './Header/ImageModal/ImageModal';
import Slider from './Header/ImageModal/Slider/Slider';
import Modal from '../../Components/Modal/Modal';
import Description from './Main/Description/Description';
import ReviewModal from './Main/Review/ReviewModal/ReviewModal';
import ScrollModal from '../../Components/ScrollModal/ScrollModal';

function Detail() {
  const [item, setItem] = useState([]);
  const [comments, setComments] = useState({});
  const [isClickedImageButton, setIsClickedImageButton] = useState(false);
  const [isClickedDescriptionButton, setIsClickedDescriptionButton] =
    useState(false);
  const [isClickedCommentButton, setIsClickedCommentButton] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({
    checkIn: '',
    checkOut: '',
    adult: 0,
    kids: 0,
    baby: 0,
    isAvailable: true,
    reservationSuccess: false,
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [offset, setOffset] = useState(1);

  const fetchComment = async () => {
    try {
      const res = await fetch('/Data/comment.json', {
        method: 'GET',
      });

      // const res = await fetch('http://10.58.6.210:8000/rooms/reviews?room_id=1', {
      //   method: 'GET',
      // });

      const data = await res.json();
      // console.log(data);
      setComments(data.reviews);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItem = async () => {
    try {
      const res = await fetch('/Data/room.json', {
        method: 'GET',
      });

      // const res = await fetch('http://10.58.7.23:8000/rooms/1', {
      //   method: 'GET',

      // });

      const data = await res.json();
      // console.log(data.result);
      // console.log(data.result);
      // setItem(data.result);
      setItem(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  // console.log(item[0].host_name);
  const requestReservation = async () => {
    try {
      console.log(reservationInfo);
      const res = await fetch('http://10.58.2.168:8000/rooms/order', {
        method: 'POST',
        body: JSON.stringify({
          check_in_date: reservationInfo.checkIn,
          check_out_date: reservationInfo.checkOut,
          adult: reservationInfo.adult,
          kids: reservationInfo.kids,
          baby: reservationInfo.baby,
          room_id: 1,
        }),
      });

      const result = await res.json();

      if (result.MESSAGE === 'SUCCESS') {
        setReservationInfo({
          ...reservationInfo,
          reservationSuccess: true,
          isAvailable: true,
        });
        return;
      }
      if (result.MESSAGE === 'EXISTS RESERVATION') {
        setReservationInfo({
          ...reservationInfo,
          reservationSuccess: false,
          isAvailable: false,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReservationInfo = (key, value) => {
    setReservationInfo({
      ...reservationInfo,
      [key]: value,
    });
  };

  const requestModifyComment = async (reviewId, content) => {
    try {
      console.log(reviewId, content);

      const res = await fetch(
        'http://10.58.3.69:8000/rooms/reviews?room_id=1',
        {
          method: 'PATCH',
          body: JSON.stringify({
            review_id: reviewId,
            content,
          }),
        },
      );

      const data = await res.json();
      console.log(data);

      if (data.MESSAGE === 'SUCCESS') {
        setComments({
          ...comments,
          comment: comments.comment.map((review) => {
            if (review.review_id === reviewId) {
              return {
                ...review,
                content,
              };
            }
            return review;
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const requestAddComment = async (userId, group = null, content) => {
    try {
      const res = await fetch(
        'http://10.58.3.69:8000/rooms/reviews?room_id=1',
        {
          method: 'POST',
          body: JSON.stringify({
            room_id: comments.room_id,
            user_id: userId,
            group_id: group,
            content,
          }),
        },
      );

      const data = await res.json();

      if (data.result.depth === 1) {
        setComments({
          ...comments,
          comment: [data.result, ...comments.comment],
        });
        return;
      }

      const indexArr = [];

      comments.comment.forEach((review, index) => {
        if (review.group_id === data.result.group_id) {
          indexArr.push(index);
        }
      });

      const startComments = comments.comment.slice(0, indexArr[0]);
      const endComments = comments.comment.slice(
        indexArr[indexArr.length - 1] + 1,
      );

      const newComments = [
        ...comments.comment.filter(
          (review) => review.group_id === data.result.group_id,
        ),
        data.result,
      ];

      setComments({
        ...comments,
        comment: [...startComments, ...newComments, ...endComments],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const requestDeleteComment = async (reviewId) => {
    try {
      const res = await fetch(
        `http://10.58.3.69:8000/rooms/reviews?review_id=${reviewId}`,
        {
          method: 'DELETE',
          body: JSON.stringify({
            review_id: reviewId,
          }),
        },
      );

      const data = await res.json();

      if (data.MESSAGE === 'SUCCESS') {
        setComments({
          ...comments,
          comment: comments.comment.map((review) => {
            if (review.review_id === reviewId) {
              return { ...review, content: '삭제된 메세지 입니다.' };
            }
            return review;
          }),
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // try {
  //   const res = await fetch('/Data/comment.json', {
  //     method: 'GET',
  //   });

  //   // const res = await fetch('http://10.58.6.210:8000/rooms/reviews?room_id=1', {
  //   //   method: 'GET',
  //   // });

  //   const data = await res.json();
  //   // console.log(data);
  //   setComments(data.reviews);
  // } catch (err) {
  //   console.error(err);
  // }

  // console.log(comments);

  return (
    <>
      {isClickedImageButton && (
        <ImageModal setIsClickedImageButton={setIsClickedImageButton}>
          <Slider image={item[0].images} />
        </ImageModal>
      )}
      {isClickedDescriptionButton && (
        <Modal closeModal={setIsClickedDescriptionButton}>
          <TitleWrapper>
            <h1>숙소 설명</h1>
          </TitleWrapper>
          <Description description={item[0].description} />
        </Modal>
      )}
      {isClickedCommentButton && (
        <ScrollModal
          closeModal={setIsClickedCommentButton}
          comments={comments}
          setComments={setComments}
        >
          <ReviewModal
            comments={comments.comment}
            points={comments.point}
            pointAverage={comments.point_average}
            reviewCount={comments.reviews_count}
            roomId={comments.room_id}
            loginUserInfo={comments.login_user_info}
            fetchComment={fetchComment}
            requestAddComment={requestAddComment}
            requestDeleteComment={requestDeleteComment}
            requestModifyComment={requestModifyComment}
          />
        </ScrollModal>
      )}
      {!isClickedImageButton && (
        <Wrapper>
          {item.length && (
            <>
              <Header
                title={item[0].title}
                pointAverage={item[0].point_average}
                reviewCount={item[0].review_count}
                images={item[0].images}
                address={item[0].address}
                setIsClickedImageButton={setIsClickedImageButton}
                setIsClickedCommentButton={setIsClickedCommentButton}
              />
              <Main
                hostName={item[0].host_name}
                profileImage={item[0].images[0]}
                maxPeople={item[0].max_people}
                roomOptions={item[0].room_options}
                description={item[0].description}
                roomConvenience={item[0].room_convenience}
                reviews={item[0].reviews}
                points={item[0].points}
                pointAverage={item[0].point_average}
                reviewCount={item[0].review_count}
                price={item[0].price}
                reservationInfo={reservationInfo}
                handleReservationInfo={handleReservationInfo}
                setIsClickedDescriptionButton={setIsClickedDescriptionButton}
                setIsClickedCommentButton={setIsClickedCommentButton}
                requestReservation={requestReservation}
              />
            </>
          )}
        </Wrapper>
      )}
    </>
  );
}

export default Detail;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 0 30px;
  max-width: 1100px;
  color: #434343;
`;

const TitleWrapper = styled.div`
  margin-bottom: 70px;

  h1 {
    margin-top: 20px;
    font-size: 28px;
    font-weight: 600;
  }
`;
