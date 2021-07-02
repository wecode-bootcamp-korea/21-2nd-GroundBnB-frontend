import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';

function ScrollModal({ children, closeModal, setComments, comments, id }) {
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(1);

  useEffect(() => {
    const { body } = document;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = '';
    };
  }, []);

  const requestMoreComments = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://10.58.3.69:8000/rooms/reviews?search=&room_id=${id}&offset=${offset}&limit=10`,
        {
          method: 'GET',
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );

      const data = await res.json();
      if (offset === 1) {
        setComments(data.reviews);
        setIsLoading(false);
        return;
      }

      setComments({
        ...comments,
        comment: comments.comment.concat(data.reviews.comment),
      });

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    requestMoreComments();
  }, [offset]);

  const handleInfiniteScroll = () => {
    const modal = modalRef.current;
    const { scrollHeight, scrollTop, clientHeight } = modal;

    if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
      setOffset((prev) => prev + 1);
    }
  };
  useEffect(() => {
    const modal = modalRef.current;
    modal.addEventListener('scroll', handleInfiniteScroll);

    return () => {
      modal.removeEventListener('scroll', handleInfiniteScroll);
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
      <ModalBody ref={modalRef}>
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

ScrollModal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default ScrollModal;

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
