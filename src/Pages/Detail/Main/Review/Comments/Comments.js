import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import ReviewBar from '../ReviewBar/ReviewBar';

function Comments({ pointAverage, points, reviews, reviewCount, images }) {
  return (
    <CommentsContainer>
      <ReviewTitle>
        <span>★</span>
        <span>{pointAverage}</span>
        <span>∙</span>
        <span>{`후기 ${reviewCount}개`}</span>
      </ReviewTitle>
      <ReviewScore>
        {points.map((point, index) => (
          <ReviewItem key={index}>
            <span>{point.name}</span>
            <ReviewBarWrapper>
              <ReviewBar point={point.point} />
              <span>{point.point}</span>
            </ReviewBarWrapper>
          </ReviewItem>
        ))}
      </ReviewScore>
      <CommentWrapper>
        {reviews
          .map((review) => (
            <Comment
              key={review.review_id}
              name={review.name}
              createdAt={review.created_at}
              content={review.content}
              reviewId={review.review_id}
              profileImage={review.profile_image}
            />
          ))
          .slice(0, 6)}
      </CommentWrapper>
    </CommentsContainer>
  );
}

Comments.propTypes = {
  pointAverage: PropTypes.number.isRequired,
  points: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      point: PropTypes.number.isRequired,
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
  reviewCount: PropTypes.number.isRequired,
};

export default Comments;

const CommentsContainer = styled.div`
  border-top: 1px solid #dfdfdf;
  padding: 40px 0 20px 0;
`;

const ReviewTitle = styled.div`
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

const ReviewScore = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const ReviewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  margin-bottom: 20px;
`;

const ReviewBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 50px;

  span:nth-child(2) {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 600;
  }
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
