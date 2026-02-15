import styled from "styled-components";
const FanArtTitle = styled.div`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  color: ${(props) => (props.$isDarkMode ? "black" : "white")};
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
const FanArtDiv = styled.div`
margin-top: 35px;
  @media (min-width: 768px) {
    margin-top: 50px;
  }
  @media (min-width: 1200px) {
    margin-top: 80px;
  }`;
const FanArt = () => {
  return <FanArtDiv>
    <FanArtTitle>Фан-арти</FanArtTitle>
  </FanArtDiv>;
};
export default FanArt;
