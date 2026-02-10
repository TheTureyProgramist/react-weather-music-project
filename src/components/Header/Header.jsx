import styled from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import user from "../../photos/hero-header/user.webp";
const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0px;
  position: sticky;
  background: white;
  top: 0;
  z-index: 100;
  @media (min-width: 768px) {
    height: 70px;
    padding: 0 30px;
  }
  @media (min-width: 1200px) {
    height: 80px;
  }
`;

const HeaderImage = styled.img`
  height: 45px;
  border-radius: 100%;
  @media (min-width: 768px) {
    height: 65px;
  }
    @media (min-width: 1200px) {
    height: 75px;
  }
  `;

const HeaderFix = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  @media (min-width: 768px) {
    gap: 30px;
  }
`;
const HeaderContacts = styled.span`
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 9px;
  color: #000;
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;
const HeaderButton = styled.button`
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 9px;
  border-radius: 10px;
  padding: 1px 1px;
  width: 90px;
  height: 28px;
  background: #ffb36c;

  @media (min-width: 768px) {
    width: 130px;
    padding: 5px 10px;
    height: 35px;
    font-size: 12px;
  }
`;
const HeaderAvatar = styled.img`
  @media (min-width: 1200px) {
    width: 50px;
    height: 50px;
  }
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  width: 30px;
  height: 30px;
`;
const HeaderAboutUs = styled.span`
  font-size: 9px;
  cursor: pointer;
  font-family: var(--second-family);
  font-weight: 500;
  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderFix>
        <HeaderImage src={logo} alt="Logo" />
        <HeaderContacts>Контакти</HeaderContacts>
        <HeaderAboutUs>Про нас</HeaderAboutUs>
      </HeaderFix>
      <HeaderFix>
        <HeaderButton>Зареєструватися</HeaderButton>
        <HeaderAvatar src={user}></HeaderAvatar>
      </HeaderFix>
    </HeaderDiv>
  );
};

export default Header;