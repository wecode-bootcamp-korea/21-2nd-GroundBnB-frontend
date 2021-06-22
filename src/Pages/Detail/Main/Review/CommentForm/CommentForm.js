import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function CommentForm({
  loginUserId,
  loginUserName,
  loginUserHostAuth,
  loginUserReplyAuth,
  setIsOpenedCommentForm,
  requestAddComment,
  group,
}) {
  const [textValue, setTextValue] = useState('');

  const handleChangeTextArea = (e) => {
    setTextValue(e.target.value);
  };

  const handleClickButton = (e) => {
    if (e.target.name === 'upload') {
      requestAddComment(loginUserId, group, textValue);
      setIsOpenedCommentForm((prev) => !prev);
    } else {
      setIsOpenedCommentForm((prev) => !prev);
    }
  };

  return (
    <CommentWrapper>
      <TextAreaWrapper>
        <textarea onChange={handleChangeTextArea} />
      </TextAreaWrapper>
      <ButtonWrapper>
        <button type="button" onClick={handleClickButton} name="upload">
          업로드
        </button>
        <button type="button" onClick={handleClickButton} name="cancle">
          취소
        </button>
      </ButtonWrapper>
    </CommentWrapper>
  );
}

CommentForm.propTypes = {
  loginUserId: PropTypes.number.isRequired,
  loginUserName: PropTypes.string.isRequired,
  loginUserHostAuth: PropTypes.number.isRequired,
  loginUserReplyAuth: PropTypes.number.isRequired,
  setIsOpenedCommentForm: PropTypes.func.isRequired,
  requestAddComment: PropTypes.func.isRequired,
  group: PropTypes.number.isRequired,
};

export default CommentForm;

const renderAnimation = keyframes`
from {
  transform: translateX(100%);
}

to {
  transform: translateX(0);
}
`;

const CommentWrapper = styled.div`
  width: 100%;
  padding: 10px;
  /* margin: 0 auto 0 20px; */
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  background: #f5f5f5;
  box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.1);
  animation: ${renderAnimation} 0.3s;
`;

const TextAreaWrapper = styled.div`
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;

    :focus {
      outline-color: grey;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 30px;
  margin: 5px 0 0 auto;

  button {
    width: 65px;
    height: 100%;
    border-radius: 10px;
    color: white;
    background: black;
    margin-left: 7px;

    :hover {
      cursor: pointer;
    }
  }
`;
