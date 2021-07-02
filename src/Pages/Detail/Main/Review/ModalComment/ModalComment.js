import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CommentForm from '../CommentForm/CommentForm';
import EditForm from '../EditForm/EditForm';

function ModalComment({
  name,
  date,
  content,
  reviewId,
  userId,
  profileImage,
  depth,
  group,
  roomId,
  loginUserId,
  loginUserName,
  loginUserHostAuth,
  loginUserReplyAuth,
  requestDeleteComment,
  requestAddComment,
  requestModifyComment,
  mineComment,
}) {
  const [isOpenedCommentForm, setIsOpenedCommentForm] = useState(false);
  const [isOpenedEditForm, setIsOpenedEditForm] = useState(false);

  const handleClickButton = (e) => {
    if (e.target.name === 'modify') {
      setIsOpenedEditForm((prev) => !prev);

      return;
    }

    if (e.target.name === 'delete') {
      requestDeleteComment(reviewId);

      return;
    }

    if (e.target.name === 'writeReviewComment') {
      setIsOpenedCommentForm((prev) => !prev);
    }
  };

  return (
    <CommentWrapper depth={depth} mineComment={mineComment}>
      <Title>
        <Image>
          <img alt="#" src="/images/profile2.jpeg" />
        </Image>
        <Profile>
          <div>
            <span>{name}</span>
            <span>{date}</span>
          </div>
          {mineComment > 0 && (
            <div>
              <button type="button" name="modify" onClick={handleClickButton}>
                수정
              </button>
              <button type="button" name="delete" onClick={handleClickButton}>
                삭제
              </button>
            </div>
          )}
        </Profile>
      </Title>
      <Description>
        {isOpenedEditForm ? (
          <EditForm
            loginUserId={loginUserId}
            loginUserName={loginUserName}
            loginUserHostAuth={loginUserHostAuth}
            loginUserReplyAuth={loginUserReplyAuth}
            setIsOpenedEditForm={setIsOpenedEditForm}
            requestModifyComment={requestModifyComment}
            reviewId={reviewId}
            content={content}
            group={group}
          />
        ) : (
          <p>{content}</p>
        )}
      </Description>
      <ReviewCommentButtonWrapper>
        {!isOpenedCommentForm && loginUserHostAuth > 0 && depth === 1 && (
          <button
            type="button"
            name="writeReviewComment"
            onClick={handleClickButton}
          >
            댓글 달기
          </button>
        )}
      </ReviewCommentButtonWrapper>
      {isOpenedCommentForm && (
        <CommentForm
          loginUserId={loginUserId}
          loginUserName={loginUserName}
          loginUserHostAuth={loginUserHostAuth}
          loginUserReplyAuth={loginUserReplyAuth}
          setIsOpenedCommentForm={setIsOpenedCommentForm}
          requestAddComment={requestAddComment}
          group={group}
        />
      )}
    </CommentWrapper>
  );
}

ModalComment.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  reviewId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  profileImage: PropTypes.string.isRequired,
  depth: PropTypes.number.isRequired,
  group: PropTypes.number.isRequired,
  roomId: PropTypes.number.isRequired,
  loginUserId: PropTypes.number.isRequired,
  loginUserName: PropTypes.string.isRequired,
  loginUserHostAuth: PropTypes.number.isRequired,
  loginUserReplyAuth: PropTypes.number.isRequired,
  requestDeleteComment: PropTypes.func.isRequired,
  requestAddComment: PropTypes.func.isRequired,
  requestModifyComment: PropTypes.func.isRequired,
  mineComment: PropTypes.number.isRequired,
};

export default ModalComment;

const CommentWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 15px 20px;
  /* padding-top: 20px;
  padding-left: 20px; */
  margin-left: ${(props) => props.depth > 1 && `${props.depth * 30}px`};
  /* border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf; */
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  background: ${(props) => (props.mineComment > 0 ? '#dfdfdf' : '#f5f5f5')};
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  /* margin: 20px 0 10px 0; */
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

    button {
      width: 40px;
      height: 20px;
      margin-right: 5px;
      border-radius: 5px;
      background: black;
      color: white;
      font-size: 11.5px;
      cursor: pointer;
    }
  }
`;

const Description = styled.div`
  margin-top: 20px;
  padding-left: 50px;
  /* padding: 10px; */

  p {
    color: #565656;
    font-size: 14.5px;
  }
`;

const ReviewCommentButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  button {
    width: 65px;
    height: 25px;
    color: white;
    border-radius: 10px;
    background: black;
    font-size: 11px;
  }
`;

// const EditForm = styled.div`
//   display: flex;
//   width: 100%;
//   height: 40px;
//   /* border: 1px solid black; */

//   input {
//     width: 80%;
//     border: 1px solid black;
//   }

//   button {
//     width: 20%;
//     border: 1px solid black;
//   }
// `;
