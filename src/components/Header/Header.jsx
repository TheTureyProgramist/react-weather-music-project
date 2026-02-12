import styled from "styled-components";
import logo from "../../photos/hero-header/logo.png";
const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px; 
  width: 100%;
  border-bottom: 1px solid ${props => props.$isDarkMode ? '#444' : 'black'};
  position: fixed;
  background: ${props => props.$isDarkMode ? '#1a1a1a' : 'white'}; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s ease;
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
const HeaderFix = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: transparent;
  border: none;
  @media (min-width: 768px) {
    gap: 30px;
    height: 60px;
  }
`;
const HeaderButton = styled.button`
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 9px;
  border-radius: 10px;
  padding: 1px 1px;
  width: 90px;
  height: 28px;
  background: #ffb36c;
  cursor: pointer;
  border: none;
  @media (min-width: 768px) {
    width: 130px;
    padding: 5px 10px;
    height: 35px;
    font-size: 12px;
  }
  @media (min-width: 1200px) {
    width: 170px;
    padding: 5px 10px;
    height: 40px;
    font-size: 15px;
  }
`;
const UserNameText = styled.span`
  font-family: var(--second-family);
  font-weight: 600;
  font-size: 9px;
   color: ${props => props.$isDarkMode ? 'white' : 'black'};
  margin-right: 10px;
    @media (min-width: 768px) {
    font-size: 12px;
  }
   @media (min-width: 1200px) {
    font-size: 15px;
  }
`;
const HeaderAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1200px) {
    width: 53px;
    height: 53px;
  }
`;

const SettingsButton = styled.button`
  background: transparent;
  color: #333;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  font-family: var(--second-family);
  font-weight: 600;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;
const HeaderAboutUs = styled.p`
  font-size: 9px;
  cursor: pointer;
  font-family: var(--second-family);
  font-weight: 600;
  color: ${props => props.$isDarkMode ? '#ddd' : 'black'};
  @media (min-width: 768px) {
    font-size: 12px;
  }
   @media (min-width: 1200px) {
    font-size: 15px;
  }
`;
const ThemeButton = styled.button`
  background: transparent;
  color: ${props => props.$isDarkMode ? '#ffb36c' : '#333'};
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  width: 30px;
  font-size: 15px;
  margin-right: 5px;
       @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1200px) {
    font-size: 22px;
  }
`;
const Header = ({ onOpenModal, onOpenSettings, user, isDarkMode, toggleTheme, currentAvatar }) => {
  return (
    <HeaderDiv $isDarkMode={isDarkMode}>
      <HeaderFix>
        <HeaderImage src={logo} alt="Logo" />
        <HeaderAboutUs $isDarkMode={isDarkMode}>Про нас</HeaderAboutUs>
      </HeaderFix>
      <HeaderFix>
        <ThemeButton onClick={toggleTheme} $isDarkMode={isDarkMode}>
            {isDarkMode ? '☀︎' : ' 🌑'}
        </ThemeButton>
        {user ? (
            <>
              <UserNameText $isDarkMode={isDarkMode}>
                  {user.firstName} {user.lastName}
              </UserNameText>
              <SettingsButton onClick={onOpenSettings}>⚙️</SettingsButton>
            </>
        ) : (
            <HeaderButton onClick={onOpenModal}>Зареєструватися</HeaderButton>
        )}
        <HeaderAvatar src={currentAvatar}></HeaderAvatar>
      </HeaderFix>
    </HeaderDiv>
  );
};
export default Header;