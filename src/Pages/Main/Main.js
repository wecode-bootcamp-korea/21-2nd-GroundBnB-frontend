import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Main() {
  const [accoms, setAccoms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data/accomData.json', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        setAccoms(data);
      });
  }, []);

  return (
    <main>
      <SImg src="images/tent.jpg" alt="tent" />
      <FirSection>
        <FWrap>
          <FTitle>슬기로운 자연생활</FTitle>
          <FTxt>에어비앤비가 엄선한 위시리스트를 만나보세요.</FTxt>
          <FLink to="/main">
            <span>여행 아이디어 얻기</span>
          </FLink>
        </FWrap>
      </FirSection>
      <SecSection>
        <AccommodationWrap>
          <AccomTitle>가까운 숙소 둘러보기</AccomTitle>
          <AccomList>
            {accoms.map((accom) => (
              <div key={accom.id}>
                <AccomLink to="/main">
                  <AccomImg>
                    <img src={accom.imgSrc} alt={accom.name} />
                  </AccomImg>
                  <AccomDescription>
                    <AccomName>
                      <b>{accom.name}</b>
                    </AccomName>
                    <AccomTxt>{accom.text}</AccomTxt>
                  </AccomDescription>
                </AccomLink>
              </div>
            ))}
          </AccomList>
        </AccommodationWrap>
      </SecSection>
      <FourthSection>
        <FourthWrap>
          <FourthTitle>
            <h1>체험 둘러보기</h1>
            <p>
              현지 전문가와 함께하는 독특한 액티비티에 오프라인이나 온라인으로
              참여해 보세요.
            </p>
          </FourthTitle>
          <FourthUl>
            <FourthLi>
              <FourthContentWrap>
                <FourthLink to="/main">
                  <FourthCard>
                    <FourthImg
                      src="https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=720"
                      alt="person"
                    />
                    <FourthCardTxtWrap>
                      <FourthCardTitle>
                        추천 컬렉션: 여행 본능을 깨우는 체험
                      </FourthCardTitle>
                      <FourthSubtilte>
                        온라인 체험으로 집에서 랜선 여행을 즐기세요.
                      </FourthSubtilte>
                    </FourthCardTxtWrap>
                  </FourthCard>
                </FourthLink>
              </FourthContentWrap>
            </FourthLi>
            <FourthLi>
              <FourthContentWrap>
                <FourthLink to="/main">
                  <FourthCard>
                    <FourthImg
                      src="https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=720"
                      alt="person"
                    />
                    <FourthCardTxtWrap>
                      <FourthCardTitle>
                        추천 컬렉션: 여행 본능을 깨우는 체험
                      </FourthCardTitle>
                      <FourthSubtilte>
                        온라인 체험으로 집에서 랜선 여행을 즐기세요.
                      </FourthSubtilte>
                    </FourthCardTxtWrap>
                  </FourthCard>
                </FourthLink>
              </FourthContentWrap>
            </FourthLi>
            <FourthLi>
              <FourthContentWrap>
                <FourthLink to="/main">
                  <FourthCard>
                    <FourthImg
                      src="https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=720"
                      alt="person"
                    />
                    <FourthCardTxtWrap>
                      <FourthCardTitle>
                        추천 컬렉션: 여행 본능을 깨우는 체험
                      </FourthCardTitle>
                      <FourthSubtilte>
                        온라인 체험으로 집에서 랜선 여행을 즐기세요.
                      </FourthSubtilte>
                    </FourthCardTxtWrap>
                  </FourthCard>
                </FourthLink>
              </FourthContentWrap>
            </FourthLi>
          </FourthUl>
        </FourthWrap>
      </FourthSection>
    </main>
  );
}

export default Main;

const SImg = styled.img`
  position: relative;
  width: 100%;
  height: 629px;
  object-fit: cover;
`;

const FirSection = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  max-width: 1760px;
  padding: 186px 80px 40px;
`;

const FWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 383px;
`;

const FTitle = styled.span`
  color: rgb(34, 34, 34);
  font-size: 60px;
  line-height: 62px;
  font-weight: 700;
  letter-spacing: -1.2px;
`;

const FTxt = styled.span`
  padding-top: 16px;
  color: rgb(34, 34, 34);
  font-size: 20px;
  line-height: 22px;
`;

const FLink = styled(Link)`
  padding-top: 16px;

  span {
    padding: 8px 16px;
    border-radius: 8px;
    color: rgb(255, 255, 255);
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    background-color: rgb(34, 34, 34);
  }
`;

const SecSection = styled.section`
  margin: 56px 0 24px;
`;

const AccommodationWrap = styled.div`
  position: relative;
  max-width: 1760px;
  margin: 0px auto;
  padding: 0 40px;
`;

const AccomTitle = styled.h1`
  padding-bottom: 16px;
  color: #222222;
  font-size: 32px;
  line-height: 52px;
  font-weight: 700;
`;

const AccomList = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  grid-template-columns: repeat(4, 1fr);
  grid-auto-flow: column;
  gap: 16px;
  padding: 8px;
`;

const AccomLink = styled(Link)`
  display: flex;
  align-items: center;
  border-radius: 12px;
  font-size: 16px;
  line-height: 20px;
  color: rgb(34, 34, 34);
`;

const AccomImg = styled.div`
  flex: 0 0 72px;
  position: relative;
  display: inline-block;
  height: 72px;
  margin-right: 16px;
  border-radius: 12px;
  background-color: rgb(221, 221, 221);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AccomDescription = styled.div`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow-x: hidden;
`;

const AccomName = styled.span`
  flex: 0 1 100%;
  padding-bottom: 2px;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const AccomTxt = styled(AccomName)`
  font-weight: 400;
  padding-bottom: 0;
`;

const FourthSection = styled.section`
  margin-bottom: 8px;
`;

const FourthWrap = styled.div`
  margin: 40px 0;
  padding: 0 40px;
`;

const FourthTitle = styled.div`
  h1 {
    color: #222222;
    font-size: 32px;
    line-height: 36px;
    font-weight: 700;
  }
  p {
    color: #222222;
    font-size: 26px;
    line-height: 36px;
    font-weight: 400;
  }
`;

const FourthUl = styled.ul`
  display: flex;
  margin: 8px -5px;
`;

const FourthLi = styled.li`
  flex: 0 0 33.3333%;
  display: flex;
  border-width: 0px 5px;
  border-style: solid;
  border-color: transparent;
  max-width: 33.3333%;
`;

const FourthContentWrap = styled.div`
  margin-right: 6px;
  margin-top: 4px;
  margin-bottom: 8px;
`;

const FourthLink = styled(Link)`
  position: relative;
  display: block;
  outline: 0;
`;

const FourthCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
`;

const FourthImg = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const FourthCardTxtWrap = styled.div`
  padding-top: 8px;
`;

const FourthCardTitle = styled.p`
  color: rgb(34, 34, 34);
  font-size: 18px;
  line-height: 22px;
  font-weight: 600;
  max-height: 44px;
  text-overflow: ellipsis;
`;

const FourthSubtilte = styled(FourthCardTitle)`
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
`;
