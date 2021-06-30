import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LanguageSvg } from '../../images/language.svg';

const FOOTER_TOP = [
  {
    title: '소개',
    contents: [
      '에어비엔비 이용 방법',
      '뉴스룸',
      '투자자정보',
      '에어비엔비 플러스',
      '에어비엔비 Luxw',
      '호텔투나잇',
      '에어비엔비 비즈니스 프로그램',
      '호스트 분들이 있기에 가능합니다.',
      ' 채용정보',
      '창립자 편지',
    ],
  },
  {
    title: '커뮤니티',
    contents: [
      '다양성 및 소속감',
      '접근성',
      '에어비엔비 어소시애이트',
      '구호 인력을 위한 숙소',
      '게스트 추천',
      'Airbnb.org',
    ],
  },
  {
    title: '호스팅하기',
    contents: [
      '숙소 호스팅',
      '온라인 체험 호스팅하기',
      '체험 호스팅하기',
      '책임감 있는 호스팅',
      '호스트 추천',
      '자료 센터',
      '커뮤니티 센터',
    ],
  },
  {
    title: '에어비엔비 지원',
    contents: [
      '에어비엔비의 코로나19 대응 방안',
      '도움말 센터',
      '예약 취소 옵션',
      '에어비엔비 이웃 민원 지원',
      '신뢰와 안전',
    ],
  },
];

const FOOTER_BOTTOM = [
  '© 2021 Airbnb, Inc.',
  '개인 정보 처리방침',
  '이용약관',
  '사이트맵',
  '한국의 변경된 환불 정책',
  '회사 세부정보',
];

const Footer = () => (
  <FooterWrap>
    <FooterTop>
      {FOOTER_TOP.map((footer, idx) => (
        <FTopSection key={`${footer + idx}`}>
          <h4>{footer.title}</h4>
          <ul>
            {footer.contents.map((content, i) => (
              <FTopLi key={`${content + i}`}>
                <Link to="/main">{content}</Link>
              </FTopLi>
            ))}
          </ul>
        </FTopSection>
      ))}
    </FooterTop>
    <FooterBottom>
      <FBottomSection>
        <LContentUl>
          {FOOTER_BOTTOM.map((footer, i) => (
            <LContentLi key={`${footer + i}`}>
              <LContentLink to="/main">{footer}</LContentLink>
            </LContentLi>
          ))}
        </LContentUl>
        <RContent>
          <ContentInner>
            <LInner>
              <SLanguageSvg />
              <span>
                <Link to="/main">한국어 (KR)</Link>
              </span>
            </LInner>
            <RInner>
              <span>₩ </span>
              <Link to="/main">KRW</Link>
            </RInner>
          </ContentInner>
        </RContent>
      </FBottomSection>
    </FooterBottom>
  </FooterWrap>
);

export default Footer;

const FooterWrap = styled.footer`
  padding: 0 80px;
  border-top: 1px solid #dddddd;
  background-color: #f7f7f7;
`;

const FooterTop = styled.div`
  display: flex;
  padding: 48px 0;

  h4 {
    font-size: 12px;
    font-weight: bold;
    color: #222222;
    text-transform: uppercase;
  }
`;

const FTopSection = styled.section`
  flex: 1;
  padding: 0 12px;
`;

const FTopLi = styled.li`
  margin-top: 16px;

  a {
    font-weight: inherit;
    font-variant: inherit;
    text-decoration: none;
    ${(props) => props.theme.DefaultFont}
    font-weight: 400;
  }
`;

const FooterBottom = styled.div`
  padding: 24px 0;
  border-top: 1px solid #dddddd;
`;

const FBottomSection = styled.section`
  ${(props) => props.theme.FlexSet('space-between', 'center')}
`;

const LContentUl = styled.ul`
  display: flex;
  margin-right: 40px;
`;

const LContentLi = styled.li`
  display: inline-block;

  &:not(:last-child)::after {
    content: '·';
    margin: 0 5px;
  }
`;

const LContentLink = styled(Link)`
  ${(props) => props.theme.DefaultFont}
  font-weight:400;
`;
const RContent = styled.div`
  ${(props) => props.theme.FlexSet('space-between', 'center')}
`;

const ContentInner = styled.div`
  display: flex;

  span {
    margin-left: 9px;
    ${(props) => props.theme.DefaultFont}
  }
`;

const LInner = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const SLanguageSvg = styled(LanguageSvg)`
  position: relative;
  top: -2px;
`;

const RInner = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 8px;
  }
`;
