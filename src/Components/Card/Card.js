import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ReviewStar } from '../../images/reviewStar.svg';

function Card({ room }) {
  return (
    <CardWrap>
      <Slider>
        <img src={room.room_images[0]} alt={room.room_name} />
      </Slider>
      <TxtWrap>
        <div>
          <ReviewStar />
          <span>{room.point_average}</span>
          <span>({room.review_count})</span>
        </div>
        <p>{room.room_name}</p>
        <p>{room.address}</p>
      </TxtWrap>
    </CardWrap>
  );
}

export default Card;

const CardWrap = styled.div`
  width: 200px;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 28%) 0px 8px 28px;
  color: rgb(34, 34, 34);
  cursor: pointer;
`;

const Slider = styled.div`
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const TxtWrap = styled.div`
  margin-top: 2px;
  div {
    span {
      margin-left: 3px;

      & + span {
        color: rgb(113, 113, 113);
      }
    }
  }

  p {
    color: rgb(34, 34, 34);
    font-size: 15px;
    line-height: 20p;
    font-weight: 400;
    white-space: nowrap;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
