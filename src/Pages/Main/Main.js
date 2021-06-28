import React from 'react';
import styled from 'styled-components';
import Footer from '../../Components/Footer/Footer';

const Main = () => (
  <>
    <main>
      <FirstSection>슬기로운자연생활</FirstSection>
      <section>가까운 숙소 둘러보기</section>
      <section>어디에서나</section>
      <section>호스팅 시작하기</section>
      <Footer />
    </main>
  </>
);

export default Main;

const FirstSection = styled.section``;
