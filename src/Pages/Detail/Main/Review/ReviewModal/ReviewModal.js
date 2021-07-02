import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReviewBar from '../ReviewBar/ReviewBar';
import CommentForm from '../CommentForm/CommentForm';
import ModalComment from '../ModalComment/ModalComment';

function ReviewModal({
  comments,
  points,
  pointAverage,
  reviewCount,
  roomId,
  loginUserInfo,
  requestAddComment,
  requestDeleteComment,
  requestModifyComment,
}) {
  const [isOpenedCommentForm, setIsOpenedCommentForm] = useState(false);
  const [isOpenedMyComment, setIsOpenedMyComment] = useState(false);

  const handleClickButton = (e) => {
    if (e.target.name === 'viewMyComment') {
      setIsOpenedMyComment((prev) => !prev);
      return;
    }

    setIsOpenedCommentForm((prev) => !prev);
  };

  return (
    <ReviewWrapper>
      <ReviewHeader>
        <ReviewTitle>
          <span>★</span>
          <span>{pointAverage}</span>
          <span>∙</span>
          <span>{`후기 ${reviewCount}개`}</span>
        </ReviewTitle>
        <SearchReview>
          <i className="fas fa-search" />
          <input placeholder="후기 검색" />
        </SearchReview>
        {loginUserInfo?.reply_auth === 1 && (
          <WriteButton>
            <button type="button" onClick={handleClickButton}>
              후기 작성
            </button>
          </WriteButton>
        )}
      </ReviewHeader>
      <ReviewBody>
        <ReviewLeft>
          <ReviewPoints>
            {points?.map((point) => (
              <ReviewItem key={point.id}>
                <span>{point.name}</span>
                <div>
                  <ReviewBar point={point.point} />
                  <span>{point.point}</span>
                </div>
              </ReviewItem>
            ))}
          </ReviewPoints>
        </ReviewLeft>
        <ReviewRight>
          <MyCommentButton
            type="button"
            onClick={handleClickButton}
            name="viewMyComment"
          >
            내가 쓴 댓글 보기
          </MyCommentButton>

          {isOpenedCommentForm && (
            <CommentForm
              setIsOpenedCommentForm={setIsOpenedCommentForm}
              requestAddComment={requestAddComment}
              loginUserId={loginUserInfo.user_id}
              loginUserName={loginUserInfo.user_name}
              loginUserHostAuth={loginUserInfo.host_auth}
              loginUserReplyAuth={loginUserInfo.reply_auth}
            />
          )}

          {isOpenedMyComment && comments && (
            <MyComments>
              {comments
                .filter((comment) => comment.mine_comment === 1)
                .map((comment) => {
                  if (comment.content === '삭제된 메세지 입니다.') {
                    return (
                      <MessageWrapper
                        depth={comment.depth}
                        key={comment.review_id}
                      >
                        <DeleteMessage>삭제된 메세지 입니다.</DeleteMessage>
                      </MessageWrapper>
                    );
                  }
                  return (
                    <ModalComment
                      key={comment.review_id}
                      name={comment.user_name}
                      date={comment.created_at}
                      content={comment.content}
                      reviewId={comment.review_id}
                      userId={comment.user_id}
                      profileImage={comment.profile_image}
                      depth={comment.depth}
                      group={comment.group_id}
                      roomId={roomId}
                      mineComment={comment.mine_comment}
                      loginUserId={loginUserInfo.user_id}
                      loginUserName={loginUserInfo.user_name}
                      loginUserHostAuth={loginUserInfo.host_auth}
                      loginUserReplyAuth={loginUserInfo.reply_auth}
                      requestDeleteComment={requestDeleteComment}
                      requestAddComment={requestAddComment}
                      requestModifyComment={requestModifyComment}
                    />
                  );
                })}
            </MyComments>
          )}
          {comments?.map((comment) => {
            if (comment.content === '삭제된 메세지 입니다.') {
              return (
                <MessageWrapper depth={comment.depth} key={comment.review_id}>
                  <DeleteMessage>삭제된 메세지 입니다.</DeleteMessage>
                </MessageWrapper>
              );
            }
            return (
              <ModalComment
                key={comment.review_id}
                name={comment.user_name}
                date={comment.created_at}
                content={comment.content}
                reviewId={comment.review_id}
                userId={comment.user_id}
                profileImage={comment.profile_image}
                depth={comment.depth}
                group={comment.group_id}
                roomId={roomId}
                mineComment={comment.mine_comment}
                loginUserId={loginUserInfo.user_id}
                loginUserName={loginUserInfo.user_name}
                loginUserHostAuth={loginUserInfo.host_auth}
                loginUserReplyAuth={loginUserInfo.reply_auth}
                requestDeleteComment={requestDeleteComment}
                requestAddComment={requestAddComment}
                requestModifyComment={requestModifyComment}
              />
            );
          })}
        </ReviewRight>
      </ReviewBody>
    </ReviewWrapper>
  );
}

ReviewModal.propTypes = {
  pointAverage: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      point: PropTypes.number.isRequired,
    }),
  ).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      review_id: PropTypes.number.isRequired,
      user_id: PropTypes.number.isRequired,
      profile_image: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      depth: PropTypes.number.isRequired,
      group_id: PropTypes.number.isRequired,
      created_at: PropTypes.string.isRequired,
      mine_comment: PropTypes.number.isRequired,
    }),
  ).isRequired,
  roomId: PropTypes.number.isRequired,
  loginUserInfo: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    user_name: PropTypes.number.isRequired,
    host_auth: PropTypes.number.isRequired,
    reply_auth: PropTypes.number.isRequired,
  }).isRequired,
  requestAddComment: PropTypes.func.isRequired,
  requestDeleteComment: PropTypes.func.isRequired,
  requestModifyComment: PropTypes.func.isRequired,
};

export default ReviewModal;

const ReviewWrapper = styled.div``;

const ReviewHeader = styled.div`
  display: flex;
`;

const SearchReview = styled.div`
  position: relative;
  width: 70%;

  input {
    width: 100%;
    height: 45px;
    padding-left: 40px;
    border: 1px solid #b0b0b0;
    border-radius: 30px;
  }

  i {
    position: absolute;
    top: 14.5px;
    left: 20px;
    color: #565656;
  }
`;

const WriteButton = styled.div`
  width: 100px;
  height: 40px;
  margin-left: 20px;
  border-radius: 10px;
  background: black;

  button {
    width: 100%;
    height: 100%;
    color: white;

    :hover {
      cursor: pointer;
    }
  }
`;

const ReviewTitle = styled.div`
  width: 30%;
  margin-bottom: 50px;
  font-size: 20px;

  span:nth-child(1) {
    color: red;
  }

  span {
    margin-right: 5px;
    font-weight: 600;
  }
`;

const ReviewBody = styled.div`
  display: flex;
  width: 100%;
`;

const ReviewLeft = styled.div`
  width: 30%;
  color: #565656;
`;

const ReviewPoints = styled.div`
  position: sticky;
  top: 30px;
  left: 10px;
  width: 100%;
  color: #565656;
`;

const ReviewRight = styled.div`
  width: 65%;
  padding-left: 20px;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  span {
    margin: 0 10px 3px 0;
    font-size: 13.5px;
    font-weight: 600;
  }

  div {
    display: flex;
    margin: 0 10px 3px 0;

    div {
      margin-top: 1.5px;
    }
  }
`;

const DeleteMessage = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-decoration: line-through;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 125px;
  width: 100%;
  margin-top: 10px;
  padding: 15px 20px;
  margin-left: ${(props) => props.depth > 1 && `${props.depth * 30}px`};
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
`;

const MyComments = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px 0 100px 0;
  border-top: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  border-radius: 20px;
`;

const MyCommentButton = styled.button`
  width: 110px;
  height: 30px;
  border: 1px solid #565656;
  border-radius: 10px;
  font-weight: 600;
  font-size: 12.5px;
  cursor: pointer;
`;
