import styled, { keyframes } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import facebok from "../../photos/footer/facebook.webp";
import whatsap from "../../photos/footer/whatsapp.webp";
const changeColor = keyframes`
0% { background: skyblue; }
50% { background: skyblue; }
100% { background: yellow; }
`;
const FooterDiv = styled.div`
  background: yellow;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: -15px;
  padding-top: 40px;
  padding-bottom: 32px;
  margin-top: 35px;
  animation: ${changeColor} 1s infinite ease-in-out;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 50px;
    gap: 60px;
    padding-bottom: 48px;
  }
  @media (min-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
    margin-top: 80px;
    gap: 100px;
    padding-bottom: 64px;
  }
`;
const FooterImage = styled.img`
  height: 85px;
  border-radius: 100%;
  @media (min-width: 768px) {
    height: 95px;
  }
  @media (min-width: 1200px) {
    height: 105px;
  }
`;
const FooterContacts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => (props.$isDarkMode ? "black" : "black")};
`;
const FooterAdress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${(props) => (props.$isDarkMode ? "black" : "black")};
`;
const FooterAdressText = styled.h1`
  font-family: var(--second-family);
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  color: ${(props) => (props.$isDarkMode ? "black" : "black")};
  @media (min-width: 768px) {
    text-align: start;
  }
`;
const FooterAdressInfo = styled.h1`
  font-family: var(--second-family);
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  @media (min-width: 768px) {
    text-align: start;
  }
`;
const FooterContactsText = styled.h2`
  font-family: var(--second-family);
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  @media (min-width: 768px) {
    text-align: start;
  }
`;
const FooterContactsFix = styled.div`
  display: flex;
  gap: 20px;
`;
const Facebook = styled.a`
  height: 40px;
  width: 40px;
  background: url(${facebok}) center no-repeat;
`;
const Whatsapp = styled.a`
  background: url(${whatsap}) center no-repeat;
  height: 40px;
  width: 40px;
`;
const Footer = () => {
  return (
    <FooterDiv>
      <FooterImage src={logo} alt="Logo" />
      <FooterAdress>
        <FooterAdressText>Адреса</FooterAdressText>
        <FooterAdressInfo>Конотоп. Україна</FooterAdressInfo>
      </FooterAdress>
      <FooterContacts>
        <FooterContactsText>Наші контакти</FooterContactsText>
        <FooterContactsFix>
          <Facebook href="https://www.facebook.com/share/g/15cVdicVtGc/"></Facebook>
          <Whatsapp href="https://chat.whatsapp.com/KvCMirZC8Hz34ObSTiwRaR"></Whatsapp>
        </FooterContactsFix>
      </FooterContacts>
      <FooterAdress>
        <FooterAdressText>Версія</FooterAdressText>
        <FooterAdressInfo>1.9.1</FooterAdressInfo>
      </FooterAdress>
    </FooterDiv>
  );
};
export default Footer;
