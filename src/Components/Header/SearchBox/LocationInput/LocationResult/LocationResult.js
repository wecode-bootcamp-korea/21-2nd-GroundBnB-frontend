import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LocationResult = ({
  defaultLi,
  data,
  selectedRegion,
  toggleWhereShow,
}) => {
  return (
    <WhereResultWrap onClick={toggleWhereShow}>
      <WhereUl>
        {defaultLi ? (
          <WhereLi>
            <WLiContent>
              <Marker>
                <MarkerIcon className="fas fa-map-marker-alt" />
              </Marker>
              <WhereP onClick={selectedRegion}>가까운 숙소 둘러보기</WhereP>
            </WLiContent>
          </WhereLi>
        ) : (
          data.map((item) => (
            <WhereLi key={item.id}>
              <WLiContent>
                <Marker>
                  <MarkerIcon className="fas fa-map-marker-alt" />
                </Marker>
                <WhereP onClick={selectedRegion}>{item.region}</WhereP>
              </WLiContent>
            </WhereLi>
          ))
        )}
      </WhereUl>
    </WhereResultWrap>
  );
};

LocationResult.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultLi: PropTypes.bool.isRequired,
  selectedRegion: PropTypes.func.isRequired,
};

export default LocationResult;

const WhereResultWrap = styled.div`
  position: absolute;
  top: 80px;
  width: 450px;
`;

const WhereUl = styled.ul`
  padding: 20px 0;
  border: 1px solid #ddd;
  border-radius: 32px;
  background-color: #fff;
`;

const WhereLi = styled.li`
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
`;

const WLiContent = styled.div`
  ${(props) => props.theme.FlexSet('flex-start', 'center')}
  padding: 10px 0;
`;

const Marker = styled.div`
  position: relative;
  width: 45px;
  height: 45px;
  margin: 0 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.04);
`;

const MarkerIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
`;

const WhereP = styled.p`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  line-height: 20px;
`;
