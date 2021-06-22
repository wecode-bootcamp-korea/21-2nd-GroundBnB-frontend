import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function EditForm({
  loginUserId,
  loginUserName,
  loginUserHostAuth,
  loginUserReplyAuth,
  setIsOpenedEditForm,
  requestModifyComment,
  reviewId,
  content,
}) {
  const [modifiedValue, setModifiedValue] = useState('');

  useEffect(() => {
    setModifiedValue(content);
  }, []);

  const handleChangeTextArea = (e) => {
    // console.log(e.target.value);
    setModifiedValue(e.target.value);
  };

  const handleClickButton = (e) => {
    if (e.target.name === 'modify') {
      requestModifyComment(reviewId, modifiedValue);
      setIsOpenedEditForm((prev) => !prev);
    } else {
      setIsOpenedEditForm((prev) => !prev);
    }
  };
  // console.log(fixedValue);
  return (
    <CommentWrapper>
      <TextAreaWrapper>
        <textarea onChange={handleChangeTextArea} value={modifiedValue} />
      </TextAreaWrapper>
      <ButtonWrapper>
        <button type="button" onClick={handleClickButton} name="modify">
          수정
        </button>
        <button type="button" onClick={handleClickButton} name="cancle">
          취소
        </button>
      </ButtonWrapper>
    </CommentWrapper>
  );
}

EditForm.propTypes = {
  loginUserId: PropTypes.number.isRequired,
  loginUserName: PropTypes.string.isRequired,
  loginUserHostAuth: PropTypes.number.isRequired,
  loginUserReplyAuth: PropTypes.number.isRequired,
  setIsOpenedEditForm: PropTypes.func.isRequired,
  requestModifyComment: PropTypes.func.isRequired,
  reviewId: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
};

export default EditForm;

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
  height: 25px;
  margin: 5px 0 0 auto;

  button {
    width: 60px;
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
