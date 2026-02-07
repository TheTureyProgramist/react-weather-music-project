import styled from 'styled-components';
import logo from '../../photos/hero-header/logo.webp';

const HeaderDiv = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

const HeaderImage = styled.img`
  height: 50px;
`;

const HeaderContacts = styled.span`
  font-size: 16px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderImage src={logo} alt="Logo" />
      <HeaderContacts>Контакти</HeaderContacts>
    </HeaderDiv>
  );
};

export default Header;
