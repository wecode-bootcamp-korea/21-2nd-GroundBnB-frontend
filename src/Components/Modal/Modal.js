import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function Modal({ children, closeModal }) {
  useEffect(() => {
    const { body } = document;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, []);

  const handleClickButton = () => {
    closeModal((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (e.target.parentNode.id === 'root') {
      closeModal((prev) => !prev);
    }
  };

  return (
    <ModalWrapper onClick={handleClickOutside}>
      <ModalBody>
        <div>
          <CloseButton type="button" onClick={handleClickButton}>
            X
          </CloseButton>
        </div>
        <div>{children}</div>
      </ModalBody>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

const renderAnimation = keyframes`
from {
  transform: translateY(150%);
}
to {
  transform: translateY(0);
}
`;

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalBody = styled.div`
  width: 70%;
  max-width: 1200px;
  height: 90%;
  padding: 2% 2% 5% 2%;
  border-radius: 20px;
  background: #fff;
  overflow: scroll;
  animation: ${renderAnimation} 0.3s;
`;

const CloseButton = styled.button`
  width: 40px;
  height: 40px;
  margin-bottom: 40px;
  color: #565656;
  font-size: 22px;
  font-weight: lighter;
  text-align: start;
`;
