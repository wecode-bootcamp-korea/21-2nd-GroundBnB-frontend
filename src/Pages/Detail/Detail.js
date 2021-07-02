import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import styled from 'styled-components';
import Header from './Header/Header';
import Main from './Main/Main';
import ImageModal from './Header/ImageModal/ImageModal';
import Slider from './Header/ImageModal/Slider/Slider';
import Modal from '../../Components/Modal/Modal';
import Description from './Main/Description/Description';
import ReviewModal from './Main/Review/ReviewModal/ReviewModal';
import ScrollModal from '../../Components/ScrollModal/ScrollModal';
import { API } from '../../config';

function Detail() {
  const [item, setItem] = useState([]);
  const [comments, setComments] = useState({});
  const [isClickedImageButton, setIsClickedImageButton] = useState(false);
  const [isClickedDescriptionButton, setIsClickedDescriptionButton] =
    useState(false);
  const [isClickedCommentButton, setIsClickedCommentButton] = useState(false);
  const [reservationInfo, setReservationInfo] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const qs = queryString.parse(location.search);

  useEffect(() => {
    const { checkIn, checkOut, adult, child, baby } = qs;
    setReservationInfo({
      checkIn,
      checkOut,
      adult: Number(adult),
      kids: Number(child),
      baby: Number(baby),
      reservationCompleted: false,
      reservationFailed: false,
    });
    // const rooms = {
    //   geo: { lat: 1, lng:1 }
    // }
  }, []);

  // const fetchComment = async () => {
  //   try {
  //     const res = await fetch('/Data/comment.json', {
  //       method: 'GET',
  //     });

  //     // const res = await fetch(`http://10.58.6.210:8000/rooms/reviews?room_id=${id}`, {
  //     //   method: 'GET',
  //     // });

  //     const data = await res.json();
  //     // console.log(data);
  //     setComments(data.reviews);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const fetchItem = async () => {
    try {
      // const res = await fetch('/Data/room.json', {
      //   method: 'GET',
      // });

      const res = await fetch(`${API}/${id}`, {
        method: 'GET',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });

      const data = await res.json();
      // console.log(data.result);
      // console.log(data.result);
      // setItem(data.result);

      setItem(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  console.log(item);

  const requestReservation = async () => {
    try {
      const res = await fetch(`${API}/order`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          check_in_date: reservationInfo.checkIn,
          check_out_date: reservationInfo.checkOut,
          adult: reservationInfo.adult,
          kids: reservationInfo.kids,
          baby: reservationInfo.baby,
          room_id: id,
        }),
      });

      const result = await res.json();

      if (result.MESSAGE === 'SUCCESS') {
        setReservationInfo({
          ...reservationInfo,
          reservationCompleted: true,
          reservationFailed: false,
        });
      } else if (result.MESSAGE === 'EXISTS RESERVATION') {
        setReservationInfo({
          ...reservationInfo,
          reservationCompleted: false,
          reservationFailed: true,
        });
      } else {
        setReservationInfo({
          ...reservationInfo,
          reservationCompleted: false,
          reservationFailed: false,
        });
        throw new Error('예약 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReservationInfo = (start, end) => {
    setReservationInfo({
      ...reservationInfo,
      checkIn: start,
      checkOut: end,
    });
  };

  const handleReservationGuest = (type, number) => {
    setReservationInfo({
      ...reservationInfo,
      [type]: number,
    });
  };

  const requestModifyComment = async (reviewId, content) => {
    try {
      const res = await fetch(`${API}/reviews?room_id=${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          review_id: reviewId,
          content,
        }),
      });

      const data = await res.json();

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
      } else {
        throw new Error('변경 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const requestAddComment = async (userId, group = null, content) => {
    try {
      const res = await fetch(`${API}/reviews?room_id=${id}`, {
        method: 'POST',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          room_id: comments.room_id,
          user_id: userId,
          group_id: group,
          content,
        }),
      });

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
      const res = await fetch(`${API}/reviews?review_id=${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token'),
        },
        body: JSON.stringify({
          review_id: reviewId,
        }),
      });

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
      } else {
        throw new Error('삭제 실패');
      }
    } catch (err) {
      console.error(err);
    }
  };

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
          id={id}
        >
          <ReviewModal
            comments={comments.comment}
            points={comments.point}
            pointAverage={comments.point_average}
            reviewCount={comments.reviews_count}
            roomId={comments.room_id}
            loginUserInfo={comments.login_user_info}
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
                images={item[0].images}
                maxPeople={item[0].max_people}
                roomOptions={item[0].room_options}
                description={item[0].description}
                roomConvenience={item[0].room_convenience}
                reviews={item[0].reviews}
                points={item[0].points}
                pointAverage={item[0].point_average}
                reviewCount={item[0].review_count}
                price={item[0].price}
                rooms={[
                  {
                    geo: { lat: item[0].latitude, lng: item[0].longitude },
                    room_images: [item[0].images[0]],
                    room_name: item[0].title,
                    address: item[0].address,
                    point_average: item[0].point_average,
                    review_count: item[0].review_count,
                  },
                ]}
                reservationInfo={reservationInfo}
                handleReservationInfo={handleReservationInfo}
                setIsClickedDescriptionButton={setIsClickedDescriptionButton}
                setIsClickedCommentButton={setIsClickedCommentButton}
                requestReservation={requestReservation}
                handleReservationGuest={handleReservationGuest}
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
