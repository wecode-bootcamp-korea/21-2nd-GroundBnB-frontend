import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MENU_LIST_LOGOUT = [
  { id: 1, name: '로그인', link: '/main' },
  { id: 2, name: '회원가입', link: '/main' },
  { id: 3, name: '숙소 호스트 되기', link: '/main' },
  { id: 4, name: '체험 호스팅하기', link: '/main' },
  { id: 5, name: '도움말', link: '/main' },
];

const MENU_LIST_LOGIN = [
  { id: 1, name: '메시지', link: '/main' },
  { id: 2, name: '알림', link: '/main' },
  { id: 3, name: '위시리스트', link: '/main' },
  { id: 4, name: '도움말', link: '/main' },
  { id: 5, name: '숙소 호스트 되기', link: '/main' },
  { id: 6, name: '체험 호스팅하기', link: '/main' },
  { id: 7, name: '계정', link: '/main' },
  { id: 8, name: '도움말', link: '/main' },
  { id: 9, name: '로그아웃', link: '/main' },
];

const DropMenu = ({ isLogin, logOut, toggleModalOpen, toggleMenuOpen }) => {
  const logOutOrModalOpen = () => {
    if (isLogin) {
      logOut();
      toggleMenuOpen();
    } else {
      toggleModalOpen();
    }
  };
  return (
    <DropMenuList>
      <ul>
        {(isLogin ? MENU_LIST_LOGIN : MENU_LIST_LOGOUT).map((content) => (
          <MenuLi key={content.id}>
            <MenuLink to={content.link} onClick={logOutOrModalOpen}>
              {content.name}
            </MenuLink>
          </MenuLi>
        ))}
      </ul>
    </DropMenuList>
  );
};

DropMenu.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  toggleModalOpen: PropTypes.func.isRequired,
  toggleMenuOpen: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
};

export default DropMenu;

const DropMenuList = styled.div`
  position: absolute;
  top: 50%;
  min-width: 240px;
  margin-top: 34px;
  padding: 8px 0;
  border-radius: 12px;
  background: #fff;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 16px;
  z-index: 2;
`;

const MenuLi = styled.li`
  &:not(:first-child) > a {
    font-weight: 400;
  }
`;

const MenuLink = styled(Link)`
  display: block;
  ${(props) => props.theme.DefaultFont}
  padding: 12px 16px;

  &:hover {
    background: #f7f7f7;
  }
`;

const Hr = styled.div`
  background: #dddddd;
  margin: 8px 0;
  height: 1px;
`;
