import styled from 'styled-components';
import logo from '../../photos/hero-header/logo.webp';

const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  position: sticky;
  background: white;
  top: 0;
  z-index: 100;
  @media (min-width: 768px) {
   height: 70px;
  }
  @media (min-width: 1200px) {
    height: 80px;
  }  
`;

const HeaderImage = styled.img`
  height: 50px;
`;

const HeaderMenu = styled.button`
  font-size: 16px;
  cursor: pointer;
`;
const HeaderFix = styled.button`
  display: flex;
`;
const HeaderContacts = styled.span`
  font-size: 16px;
  cursor: pointer;
`;
 const HeaderButton = styled.span`
    background-image: ../../;
    cursor: pointer;
`;
// const HeaderContacts = styled.span`
//   font-size: 16px;
//   cursor: pointer;
// `;
// const HeaderContacts = styled.span`
//   font-size: 16px;
//   cursor: pointer;
// `;

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderImage src={logo} alt="Logo" />
      <HeaderFix>    
          <HeaderMenu>Меню</HeaderMenu>
      <HeaderButton> </HeaderButton>
      </HeaderFix>
      <HeaderContacts></HeaderContacts>
      <HeaderContacts></HeaderContacts>
      <HeaderContacts></HeaderContacts>
    </HeaderDiv>
  );
};

export default Header;
