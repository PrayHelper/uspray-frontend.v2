import {
  HeaderWrapper,
  HeaderCont,
  BtnWrapper,
  MyBtn,
  SharedBtn,
} from "./style";

const Header = ({ children }) => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderWrapper>
        <HeaderCont>
          <div>{children}</div>
          <img src="../images/ic_search_grey.svg" alt="icon_search" />
        </HeaderCont>
        <BtnWrapper>
          <MyBtn>내가 쓴 기도</MyBtn>
          <SharedBtn>공유받은 기도</SharedBtn>
        </BtnWrapper>
      </HeaderWrapper>
      {/* <div style={{ color: "red", paddingTop: "65px" }}>asdsasd</div> */}
    </div>
  );
};

export default Header;
