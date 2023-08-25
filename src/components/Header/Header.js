import { HeaderStyle } from "./style";

const Header = ({ children }) => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderStyle>{children}</HeaderStyle>
    </div>
  );
};

export default Header;
