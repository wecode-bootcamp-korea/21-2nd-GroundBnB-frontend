import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Comment({ name, createdAt, content }) {
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
        </Profile>
      </Title>
      <Description>
        <p>{content}</p>
      </Description>
    </CommentWrapper>
  );
}

Comment.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Comment;

const CommentWrapper = styled.div`
  width: 50%;
  margin-top: 10px;
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
