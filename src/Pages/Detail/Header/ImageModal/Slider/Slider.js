import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import usePrevious from '../../../../../hooks/usePrevious';

function Slider({ image }) {
  const slideContainerRef = useRef();
  const slideContainer = slideContainerRef.current;
  const [distance, setDistance] = useState(-800);
  const [images, setImages] = useState([]);
  const [transitionTime, setTransitionTime] = useState('0.5s');
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [isTransitionEnd, setIsTransitionEnd] = useState(true);
  const lastDistance = usePrevious(distance);

  const changeImageOrder = (direction = 'right') => {
    if (direction === 'left') {
      setImages([...images.filter((_, index) => index !== 0), images[0]]);
    } else {
      setImages([
        images[images.length - 1],
        ...images.filter((_, index) => index !== images.length - 1),
      ]);
    }
  };

  const handleClickButton = (e) => {
    if (!isTransitionEnd) return;
    setIsTransitionEnd(false);

    if (e.target.parentNode.name === 'left') {
      setDistance((prev) => prev + 800);
    } else {
      setDistance((prev) => prev - 800);
    }
  };

  useEffect(() => {
    setImages(image.map((img, idx) => ({ src: img, id: idx + 1 })));

    return () => {
      setIsFirstMount(true);
      setIsTransitionEnd(true);
    };
  }, []);

  useEffect(() => {
    if (!isFirstMount) {
      slideContainer.style.transform = `translate3d(${distance}px,0,0)`;

      slideContainer.addEventListener('transitionend', () => {
        setIsTransitionEnd(true);
        setDistance(-800);

        if (lastDistance < distance) {
          changeImageOrder();
        } else {
          changeImageOrder('left');
        }

        setTransitionTime('');
      });
    } else {
      setIsFirstMount(false);
    }
    setTransitionTime('0.5s');
  }, [distance]);

  return (
    <>
      {images.length && (
        <>
          <Screen>
            <SlideContainer
              ref={slideContainerRef}
              distance={distance}
              transitionTime={transitionTime}
            >
              <Slide>
                <img alt="#" src={images[images.length - 1].src} />
              </Slide>
              <Slide>
                <img alt="#" src={images[0].src} />
              </Slide>
              <Slide>
                <img alt="#" src={images[1].src} />
              </Slide>
            </SlideContainer>
          </Screen>
          <SlideOrder>{`${images[0].id} / ${images.length}`}</SlideOrder>
          <LeftButton type="button" onClick={handleClickButton} name="left">
            <i className="fas fa-chevron-circle-left fa-2x" />
          </LeftButton>
          <RightButton type="button" onClick={handleClickButton} name="right">
            <i className="fas fa-chevron-circle-right fa-2x" />
          </RightButton>
        </>
      )}
    </>
  );
}

Slider.propTypes = {
  image: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Slider;

const Screen = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 700px;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  position: absolute;
  display: flex;
  height: 700px;
  transform: translateX(${(props) => props.distance}px);
  transition: ${(props) => props.transitionTime};
`;

const Slide = styled.div`
  width: 800px;
  height: 700px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const SlideOrder = styled.span`
  position: absolute;
  top: 110px;
  left: 50%;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  transform: translateX(-50%);
`;

const LeftButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  transform: translateY(-50%);

  :hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const RightButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 50%;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  transform: translateY(-50%);

  :hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
