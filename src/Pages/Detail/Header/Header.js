import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Header({
  title,
  pointAverage,
  reviewCount,
  images,
  address,
  setIsClickedImageButton,
  setIsClickedCommentButton,
}) {
  const handleClickButton = (e) => {
    if (e.target.name === 'reviewButton') {
      setIsClickedCommentButton((prev) => !prev);
    } else {
      setIsClickedImageButton((prev) => !prev);
    }
  };

  return (
    <header>
      <Title>
        <div>
          <h1>{title}</h1>
        </div>
        <TitleReviewContainer>
          <TitleReview>
            <span>★</span>
            <span>{pointAverage}</span>
            <button
              type="button"
              onClick={handleClickButton}
              name="reviewButton"
            >{`후기 ${reviewCount}개`}</button>
            <span>•</span>
            <span>{address}</span>
          </TitleReview>
          <TitleButtons>
            <div>
              <i className="fas fa-heart" />
              <span>저장</span>
            </div>
          </TitleButtons>
        </TitleReviewContainer>
      </Title>
      <ImageContainer onClick={handleClickButton}>
        <BigImage>
          <div>
            <img alt="#" src={images[0]} />
          </div>
        </BigImage>
        <SmallImage>
          {images
            .filter((_, index) => index > 0 && index < 5)
            .map((image, index) => (
              <div key={index}>
                <img alt="#" src={image} />
              </div>
            ))}
        </SmallImage>
        <ImageButton>사진 모두 보기</ImageButton>
      </ImageContainer>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  pointAverage: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  address: PropTypes.string.isRequired,
  setIsClickedImageButton: PropTypes.func.isRequired,
  setIsClickedCommentButton: PropTypes.func.isRequired,
};

export default Header;

const Title = styled.div`
  margin-top: 100px;
  width: 100%;
  color: black;
  font-size: 30px;
`;
const TitleReviewContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  font-size: 14px;
`;

const TitleReview = styled.div`
  span {
    margin-right: 7px;
    color: grey;
  }

  span:nth-child(1) {
    color: red;
  }

  span:nth-child(2) {
    color: black;
    font-weight: 600;
  }

  button:nth-child(3) {
    color: grey;
    text-decoration: underline;

    :hover {
      cursor: pointer;
    }
  }

  span:nth-child(5) {
    text-decoration: underline;
  }
`;

const TitleButtons = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-right: 10px;

    span {
      margin-left: 10px;
      text-decoration: underline;
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  margin: 30px 0;
  width: 100%;
  max-height: 500px;
  min-height: 400px;
  border-radius: 20px;
`;

const BigImage = styled.div`
  width: 50%;

  div {
    position: relative;
    width: 100%;
    height: 100%;
    border-right: 5px solid white;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: 20px 0 0 20px;
      transition: 0.5s;
    }

    :hover {
      ::before {
        background: rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 20px 0 0 20px;
    }
  }
`;

const SmallImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;

  div {
    position: relative;
    width: 50%;
    height: 50%;

    ::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: 0.5s;
    }

    :hover {
      ::before {
        background: rgba(0, 0, 0, 0.2);
        cursor: pointer;
      }
    }

    img {
      width: 100%;
      height: 100%;
    }
  }

  div:nth-child(1) {
    border-bottom: 2.5px solid white;
    border-right: 2.5px solid white;
  }

  div:nth-child(2) {
    border-bottom: 2.5px solid white;
    border-left: 2.5px solid white;

    img {
      border-radius: 0 20px 0 0;
    }

    ::before {
      border-radius: 0 20px 0 0;
    }
  }

  div:nth-child(3) {
    border-top: 2.5px solid white;
    border-right: 2.5px solid white;
  }

  div:nth-child(4) {
    border-top: 2.5px solid white;
    border-left: 2.5px solid white;

    img {
      border-radius: 0 0 20px 0;
    }

    ::before {
      border-radius: 0 0 20px 0;
    }
  }
`;

const ImageButton = styled.button`
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 130px;
  height: 35px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
  font-weight: 600;

  :hover {
    background: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
`;
