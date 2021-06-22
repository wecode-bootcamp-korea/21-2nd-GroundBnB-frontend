import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Comment({ name, createdAt, content }) {
  // const handleClickButton = (e) => {
  //   if (e.target.name === 'modify') {
  //     console.log('modify', reviewId);
  //     return;
  //   }

  //   if (e.target.name === 'delete') {
  //     console.log('delete', reviewId);
  //     return;
  //   }

  //   if (e.target.name === 'writeReviewComment') {
  //     console.log('writeReviewComment', reviewId);
  //     return;
  //   }
  // };

  return (
    <CommentWrapper>
      <Title>
        <Image>
          <img alt="#" src="/Images/profile2.jpeg" />
        </Image>
        <Profile>
          <div>
            <span>{name}</span>
            <span>{createdAt}</span>
          </div>
          {/* {isModal && (
            <div>
              <button type="button" name="modify" onClick={handleClickButton}>
                수정
              </button>
              <span> | </span>
              <button type="button" name="delete" onClick={handleClickButton}>
                삭제
              </button>
            </div>
          )} */}
        </Profile>
      </Title>
      <Description>
        <p>{content}</p>
      </Description>
      {/* {isModal && (
        <ReviewCommentButtonWrapper>
          <button
            type="button"
            name="writeReviewComment"
            onClick={handleClickButton}
          >
            댓글 달기
          </button>
        </ReviewCommentButtonWrapper>
      )} */}
    </CommentWrapper>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  // reviewId: PropTypes.number.isRequired,
  // isModal: PropTypes.string.isRequired,
};

export default Comment;

const CommentWrapper = styled.div`
  width: 50%;
  margin: 20px 0;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 10px 0;
`;

const Image = styled.div`
  width: 50px;
  height: 50px;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  div:nth-child(1) {
    display: flex;
    flex-direction: column;
    margin-left: 10px;

    span {
      color: #565656;
      font-size: 14px;
    }

    span:nth-child(1) {
      margin-bottom: 3px;
      font-size: 16px;
      font-weight: 600;
    }
  }

  div:nth-child(2) {
    display: flex;
    justify-content: space-between;
    /* margin-right: 30px; */

    span {
      margin-top: 3px;
    }

    button {
      cursor: pointer;
    }
  }
`;

const Description = styled.div`
  padding: 10px;

  p {
    color: #565656;
    font-size: 14.5px;
  }
`;

// const ReviewCommentButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;

//   button {
//     width: 65px;
//     height: 25px;
//     color: white;
//     border-radius: 10px;
//     background: black;
//     font-size: 11px;
//   }
// `;
