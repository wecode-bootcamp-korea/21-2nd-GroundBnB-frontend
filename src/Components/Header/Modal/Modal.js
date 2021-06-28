import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = ({ width, maxWidth, children, onClose }) => (
  <ModalOverlay className="modalOverlay" onClick={onClose}>
    <ModalWrap>
      <ModalContents
        width={width}
        maxWidth={maxWidth}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </ModalContents>
    </ModalWrap>
  </ModalOverlay>
);

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string.isRequired,
  maxWidth: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 101;
`;

const ModalWrap = styled.div`
  ${(props) => props.theme.FlexSet('center', 'center')}
  position: fixed;
  inset: 0;
  z-index: 100;
  overflow: hidden;
  outline: 0;
`;

const ModalContents = styled.div`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  margin: 0 auto;
  border-radius: 12px;
  background-color: #fff;
`;
