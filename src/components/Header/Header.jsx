import styled from 'styled-components';
import logo from '../../photos/hero-header/logo.webp';

const HeaderDiv = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: sticky;
  background: white;
  top: 0;
  z-index: 100;
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
      <HeaderContacts>Меню</HeaderContacts>
      
    </HeaderDiv>
  );
};

export default Header;
