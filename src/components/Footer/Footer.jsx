import styled, { keyframes } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import facebok from "../../photos/footer/facebook.webp";
import whatsap from "../../photos/footer/whatsapp.webp";
const changeColor = keyframes`
0% { background: skyblue; }
1% { background: yellow; }
2% { background: skyblue; }
3% { background: yellow; }
4% { background: skyblue; }
5% { background: yellow; }
6% { background: skyblue; }
7% { background: yellow; }
8% { background: skyblue; }
9% { background: yellow; }
10% { background: skyblue; }
11% { background: yellow; }
12% { background: skyblue; }
13% { background: yellow; }
14% { background: skyblue; }
15% { background: yellow; }
16% { background: skyblue; }
17% { background: yellow; }
18% { background: skyblue; }
19% { background: yellow; }
20% { background: skyblue; }
21% { background: yellow; }
22% { background: skyblue; }
23% { background: yellow; }
24% { background: skyblue; }
39% { background: yellow; }
40% { background: skyblue; }
41% { background: yellow; }
52% { background: skyblue; }
53% { background: yellow; }
54% { background: skyblue; }
55% { background: yellow; }
56% { background: skyblue; }
57% { background: yellow; }
58% { background: skyblue; }
59% { background: yellow; }
60% { background: skyblue; }
61% { background: yellow; }
62% { background: skyblue; }
63% { background: yellow; }
64% { background: skyblue; }
65% { background: yellow; }
66% { background: skyblue; }
67% { background: yellow; }
68% { background: skyblue; }
69% { background: yellow; }
70% { background: skyblue; }
71% { background: yellow; }
72% { background: skyblue; }
73% { background: yellow; }
74% { background: skyblue; }
75% { background: yellow; }
90% { background: skyblue; }
91% { background: yellow; }
92% { background: skyblue; }
93% { background: yellow; }
94% { background: skyblue; }
95% { background: yellow; }
96% { background: skyblue; }
97% { background: yellow; }
98% { background: skyblue; }
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
  animation: ${changeColor} 15s infinite ease-in-out;

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
  color: ${props => props.$isDarkMode ? 'black' : 'black'};
`;
const FooterAdress = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${props => props.$isDarkMode ? 'black' : 'black'};
`;
const FooterAdressText = styled.h1`
  font-family: var(--second-family);
  font-weight: 500;
  text-align: center;
  font-size: 16px;
  color: ${props => props.$isDarkMode ? 'black' : 'black'};
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
        <FooterAdressInfo>1.8.3</FooterAdressInfo>
      </FooterAdress>
    </FooterDiv>
  );
};
export default Footer;
