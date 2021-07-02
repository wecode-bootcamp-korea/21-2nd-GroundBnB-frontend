import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function DetailModal({ children, setIsClickedImageButton }) {
  const handleClickButton = (e) => {
    if (e.target.name === 'close' || e.target.parentNode.name === 'close') {
      setIsClickedImageButton((prev) => !prev);
    }
    if (e.target.name === 'save' || e.target.parentNode.name === 'save') {
      console.log('save');
    }
  };

  return (
    <ModalWrapper>
      <Nav>
        <div>
          <button type="button" onClick={handleClickButton} name="close">
            <span>X</span>
            <span>닫기</span>
          </button>
        </div>
        <div>
          <button type="button" onClick={handleClickButton} name="save">
            <i className="fas fa-heart" />
            <span>저장</span>
          </button>
        </div>
      </Nav>
      <Main>{children}</Main>
    </ModalWrapper>
  );
}

DetailModal.propTypes = {
  children: PropTypes.element.isRequired,
  setIsClickedImageButton: PropTypes.func.isRequired,
};

export default DetailModal;

const renderAnimation = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 1);
  z-index: 1000;
  animation: ${renderAnimation} 1s;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 110px;
  padding: 30px;
  margin: 0 auto 30px auto;
  color: #4d4d4d;

  div {
    display: flex;
    align-items: center;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 40px;
      margin: 0 7px;
      color: white;
      border: 1px solid #fff;
      border-radius: 10px;

      span:nth-child(1) {
        margin: 0 10px 1px 0;
      }

      i {
        margin-left: 7px;
      }
    }

    button:hover {
      border: none;
      background: rgba(255, 255, 255, 0.5);
    }
  }

  div:nth-child(2) {
    i {
      margin-right: 10px;
    }

    span {
      font-size: 15px;
      color: #fff;
    }
  }

  i {
    color: #fff;
  }
`;

const Main = styled.div`
  width: 100%;
`;
