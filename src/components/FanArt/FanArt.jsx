import styled from "styled-components";
import turkeys from "../../photos/vip-images/ultra-vip-turkeys.webp";
import dragons from "../../photos/vip-images/vip-dragons.jpg";
import horrordog from "../../photos/vip-images/horror.jpg";
import horse from "../../photos/vip-images/horse.jpg";
import lebid from "../../photos/vip-images/vip-lebid.jpg";
import rooster from "../../photos/vip-images/vip-rooster.jpg";
import nicerone from "../../photos/vip-images/vip-dinofroz.webp";
import soloveyko from "../../photos/vip-images/vip-soloveyko.jpg";
import monody from "../../photos/vip-images/vip-forest.webp";
const FanArtDiv = styled.div`
  margin-top: 35px;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
  }
`;

const FanArtTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "white" : "black")};
  margin-bottom: 35px;
  @media (min-width: 768px) {
    font-size: 20px;
    margin-bottom: 50px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
    margin-bottom: 80px;
  }
`;
const FanBlock = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 15px;
  padding: 10px 10px 20px 10px;
  &::-webkit-scrollbar {
    height: 8px;
    display: block;
  }
  &::-webkit-scrollbar-track {
    background: rgba(128, 0, 128, 0.1);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #8a2be2;
    border-radius: 10px;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #7b1fa2;
  }
  scrollbar-width: auto;
  scrollbar-color: #8a2be2 rgba(128, 0, 128, 0.1);
`;

const BenefitImage = styled.img`
  flex: 0 0 85%;
  width: 85%;
  scroll-snap-align: center;
  border-radius: 15px;
  object-fit: cover;
  height: 300px;

  @media (min-width: 768px) {
    flex: 0 0 45%;
    width: 45%;
    height: 400px;
  }

  @media (min-width: 1200px) {
    flex: 0 0 30%;
    width: 20%;
    height: auto;
  }
`;
const FanArt = ({ isDarkMode }) => {
  const images = [
    turkeys,
    nicerone,
    dragons,
    horse,
    lebid,
    monody,
    horrordog,
    rooster,
    soloveyko,
  ];
  return (
    <FanArtDiv>
      <FanArtTitle $isDarkMode={isDarkMode}>Фан-арти</FanArtTitle>
      <FanBlock>
        {images.map((img, index) => (
          <BenefitImage key={index} src={img} alt="Fan art" />
        ))}
      </FanBlock>
    </FanArtDiv>
  );
};
export default FanArt;
