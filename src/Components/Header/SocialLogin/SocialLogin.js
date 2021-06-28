import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CloseBtnSvg } from '../../../images/modalCloseBtn.svg';
import { ReactComponent as GoogleSvg } from '../../../images/googleIcon.svg';
import { ReactComponent as FacebookSvg } from '../../../images/facebookIcon.svg';
import { ReactComponent as GithubvSvg } from '../../../images/githubIcon.svg';
import { ReactComponent as KakaoSvg } from '../../../images/kakaoIcon.svg';

const SocialLogin = ({ logIn, onClose }) => (
  <SocialLoginWrap className="socialLogin">
    <SocialHeaderWrap>
      <CloseBtn onClick={(e) => onClose(e)}>
        <CloseBtnSvg />
      </CloseBtn>
      <SocialHeader>로그인 또는 회원가입</SocialHeader>
    </SocialHeaderWrap>
    <SocialBtnWrap>
      <SocialBtn>
        <GoogleSvg />
        <SocialTxt>구글로 로그인하기</SocialTxt>
      </SocialBtn>
      <SocialBtn>
        <FacebookSvg />
        <SocialTxt>페이스북으로 로그인하기</SocialTxt>
      </SocialBtn>
      <SocialBtn>
        <GithubvSvg />
        <SocialTxt>깃헙으로 로그인하기</SocialTxt>
      </SocialBtn>
      <SocialBtn onClick={logIn}>
        <ExtendKakaoSvg />
        <SocialTxt>카카오로 로그인하기</SocialTxt>
      </SocialBtn>
    </SocialBtnWrap>
  </SocialLoginWrap>
);

SocialLogin.propTypes = {
  onClose: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
};

export default SocialLogin;

const SocialLoginWrap = styled.div`
  /* max-width: 568px; */
  width: 568px;
  border: 1px solid #ddd;
  border-radius: 12px;
`;

const SocialHeaderWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  padding: 0px 24px;
  border-bottom: 1px solid rgb(235, 235, 235);
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 50%;
  left: 24px;
  appearance: none;
  background: transparent;
  transform: translateY(-50%);
  outline: none;

  //TODO: 소셜 레이아웃 다 하고 hover 위치 설정해주기
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:hover::before {
    background: rgb(0, 0, 0, 0.1);
  }
`;

const SocialHeader = styled.header`
  padding: 0px 24px;
  color: rgb(34, 34, 34);
  font-size: 16px;
  line-height: 20px;
  font-weight: 800;
`;

const SocialBtnWrap = styled.div`
  padding: 24px;
  outline: none;
`;

const SocialBtn = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 16px;
  border: 2px solid rgb(176, 176, 176);
  border-radius: 8px;
  background: transparent;
  color: rgb(72, 72, 72);
  font-size: 16px;
  line-height: 24px;
  font-weight: 800;
`;

const SocialTxt = styled.p`
  flex: 0.95;
  font-size: 14px;
  font-weight: 600;
`;

const ExtendKakaoSvg = styled(KakaoSvg)`
  border-radius: 50%;
  background: rgb(0, 0, 0);

  &:before {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
