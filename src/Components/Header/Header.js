import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as UserSvg } from '../../images/usericon.svg';
import { ReactComponent as MenuSvg } from '../../images/hamburger.svg';
import { ReactComponent as LanguageSvg } from '../../images/language.svg';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';

import SearchBox from './SearchBox/SearchBox';
import DropMenu from './DropMenu/DropMenu';
import Modal from './Modal/Modal';
import SocialLogin from './SocialLogin/SocialLogin';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loginUser, setLoginUser] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const toggleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleModalOpen = () => {
    setModalOpen(!modalOpen);
    setMenuOpen(false);
  };

  const kakaoLogIn = () => {
    const { Kakao } = window;

    if (!localStorage.getItem('token')) {
      Kakao.init(process.env.REACT_APP_JAVASCRIPT_API_KEY);

      Kakao.Auth.login({
        success(authObj) {
          Kakao.Auth.setAccessToken(authObj.access_token);

          fetch('http://10.58.6.227:8000/users/login/kakao', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: authObj.access_token,
            },
          })
            .then((res) => res.json())
            .then((result) => {
              localStorage.setItem('token', result.access_token);

              if (localStorage.getItem('token')) {
                setLoginUser(true);
                alert('logIn Success');
              }
            });
        },

        fail(err) {
          console.log('fail err', err);
        },
      });

      toggleModalOpen();
    } else {
      alert('이미 로그인 되어있습니다.');
    }
  };

  const kakaoLogOut = () => {
    const { Kakao } = window;

    if (localStorage.getItem('token')) {
      if (!Kakao.Auth.getAccessToken()) {
        console.log('Not logged in.');
        return;
      }

      Kakao.Auth.logout(() => {
        console.log(Kakao.Auth.getAccessToken());
      });

      localStorage.clear();
      setLoginUser(false);
      alert('log Out');
    } else {
      alert('login needing');
    }
  };

  const toggleSearchOpen = () => {
    setIsSearch(!isSearch);
  };

  return (
    <>
      <FixedHeader>
        <FlexWrap>
          <LogoLink to="/main">
            <LogoSvg />
          </LogoLink>

          <SearchBox isSearch={isSearch} toggleSearchOpen={toggleSearchOpen} />

          <NavWrap>
            <HostWrap>
              <HostLink to="/host/home">
                <HostTxt>호스트 되기</HostTxt>
              </HostLink>

              <Language>
                <LangBtn>
                  <LanguageSvg />
                </LangBtn>
              </Language>
            </HostWrap>

            <DropdownBtn type="button" onClick={toggleMenuOpen}>
              <MenuSvg />
              <IconWrap>
                <UserSvg />
              </IconWrap>
            </DropdownBtn>

            {menuOpen && (
              <DropMenu
                isLogin={loginUser}
                logOut={kakaoLogOut}
                toggleModalOpen={toggleModalOpen}
                toggleMenuOpen={toggleMenuOpen}
              />
            )}
          </NavWrap>
        </FlexWrap>
      </FixedHeader>

      {modalOpen && (
        <Modal width="100%" maxWidth="568px" onClose={toggleModalOpen}>
          <SocialLogin onClose={toggleModalOpen} logIn={kakaoLogIn} />
        </Modal>
      )}
    </>
  );
}

export default Header;

const FixedHeader = styled.header`
  position: fixed;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  z-index: 100;
`;

const FlexWrap = styled.div`
  position: relative;
  ${(props) => props.theme.FlexSet('space-between', 'center')}
  height: 100%;
  /* margin: 0 80px; */
  padding: 0 80px;
  background: transparent;
`;

const LogoLink = styled(Link)`
  ${(props) => props.theme.FlexSet('', 'center')}
  height: 80px;
  z-index: 0;
`;

const NavWrap = styled.nav`
  ${(props) => props.theme.FlexSet('flex-end')}
  height: 80px;
`;

const HostWrap = styled.div`
  ${(props) => props.theme.FlexSet()}
  margin-right: 8px;
`;

const HostLink = styled(Link)`
  position: relative;
  display: inline-block;
  padding: 12px;
  background: transparent;
  ${(props) => props.theme.DefaultFont}
  outline: none;
  z-index: 1;

  &::before {
    position: absolute;
    content: '';
    top: 0px;
    right: -3px;
    left: -3px;
    bottom: 0px;
    border-radius: 22px;
    z-index: 0;
  }

  &:hover::before {
    background: #f7f7f7;
  }
`;

const HostTxt = styled.div`
  position: relative;
  height: 100%;
  z-index: 1;
`;

const Language = styled.div`
  position: relative;
`;

const LangBtn = styled.div`
  padding: 12px;
  outline: none;
  z-index: 10;

  &::before {
    position: absolute;
    content: '';
    top: 0px;
    right: -3px;
    left: -3px;
    bottom: 0px;
    border-radius: 22px;
    z-index: -1;
  }

  &:hover::before {
    background: #f7f7f7;
  }
`;

const DropdownBtn = styled.button`
  ${(props) => props.theme.FlexSet(null, null, 'center')}
  position: relative;
  height: 42px;
  padding: 5px 5px 5px 12px;
  border: 1px solid #dddddd;
  border-radius: 21px;
  background-color: #fff;
`;

const IconWrap = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  margin-left: 12px;
  color: #717171;
`;
