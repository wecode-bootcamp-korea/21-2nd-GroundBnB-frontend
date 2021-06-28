import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DATA = [
  { id: 1, type: 'adult', name: '성인', text: '만 13세 이상' },
  { id: 2, type: 'child', name: '어린이', text: '만 2~12세' },
  { id: 3, type: 'baby', name: '유아', text: '만 2세 미만' },
];

const GuestInputResult = ({ person, minusCount, plusCount }) => {
  return (
    <WhoWrap>
      <WhoUl>
        {DATA.map((data) => (
          <WhoLi key={data.id}>
            <div>
              <Person>{data.name}</Person>
              <Age>{data.text}</Age>
            </div>
            <ButtonWrap>
              <button type="button" onClick={() => minusCount(data.type)}>
                -
              </button>
              <span>{person[data.type]}</span>
              <button type="button" onClick={() => plusCount(data.type)}>
                +
              </button>
            </ButtonWrap>
          </WhoLi>
        ))}
      </WhoUl>
    </WhoWrap>
  );
};

GuestInputResult.propTypes = {
  plusCount: PropTypes.func.isRequired,
  minusCount: PropTypes.func.isRequired,
};

export default GuestInputResult;

const WhoWrap = styled.div`
  position: absolute;
  top: 80px;
  right: 0;
  width: 350px;
`;

const WhoUl = styled.ul`
  padding: 4px 20px;
  border: 1px solid #ddd;
  border-radius: 32px;
  background-color: #fff;
`;

const WhoLi = styled.li`
  ${(props) => props.theme.FlexSet('space-between', 'center')}
  padding: 16px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(235, 235, 235);
  }
`;

const Person = styled.p`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const Age = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: rgb(113, 113, 113);
`;

const ButtonWrap = styled.div`
  ${(props) => props.theme.FlexSet('space-between', 'center')}
  width: 104px;
  height: 32px;
  font-size: 16px;
  line-height: 20px;

  button {
    width: 32px;
    height: 32px;
    border: 1px solid rgb(176, 176, 176);
    border-radius: 50%;
    color: rgb(113, 113, 113);
    font-size: 25px;
    text-align: center;
    outline: 0;
  }
`;
