import styled from "styled-components";
const MainTitle = styled.h2`
  font-size: 14px;
  text-align: center;
  font-family: var(--font-family);
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1200px) {
    font-size: 30px;
  }
`;
const MainDiv = styled.div``;
const Main = () => {
  return (
    <MainDiv>
      <MainTitle>Погодні картки місця</MainTitle>
    </MainDiv>
  );
};
export default Main;