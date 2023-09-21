import {
  HeaderWrapper,
  HeaderCont,
  BtnWrapper,
  MyBtn,
  SharedBtn,
} from "./style";

const Header = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <HeaderWrapper>
        <HeaderCont>
          <div>{props.children}</div>
          <img src="../images/ic_search_grey.svg" alt="icon_search" />
        </HeaderCont>
        <BtnWrapper>
          <MyBtn id="date" onClick={props.onClickToggle} sortBy={props.sortBy}>
            내가 쓴 기도
          </MyBtn>
          <SharedBtn
            id="cnt"
            onClick={props.onClickToggle}
            sortBy={props.sortBy}
          >
            공유받은 기도
          </SharedBtn>
        </BtnWrapper>
      </HeaderWrapper>
      {/* <div style={{ color: "red", paddingTop: "65px" }}>asdsasd</div> */}
    </div>
  );
};

export default Header;
