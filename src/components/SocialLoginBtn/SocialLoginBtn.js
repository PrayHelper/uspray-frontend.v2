import styled from "styled-components";

export const SocialLoginBtnStyle = styled.button`
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-left: 24px;
  margin-right: 24px;
  height: 64px;
  border-radius: 32px;
  border-style: none;
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ color }) => color};
  font-weight: 700;
  position: relative;
`;

// padding: ${(props) =>
// props.buttonSize == ButtonSize.NORMAL ? "0px" : "20px 26px 20px 16px"};

// theme: "kakao" | "naver" | "apple"
const SocialLoginBtn = ({ theme, children, ...props }) => {
  "";
  const options = {
    kakao: {
      bgColor: "rgba(254, 229, 0, 1)",
      color: "rgba(0, 0, 0, 1)",
    },
    naver: {
      bgColor: "rgba(3, 207, 93, 1)",
      color: "rgba(255, 255, 255, 1)",
    },
    apple: {
      bgColor: "rgba(0, 0, 0, 1)",
      color: "rgba(255, 255, 255, 1)",
    },
  };

  return (
    <SocialLoginBtnStyle
      {...props}
      bgColor={options[theme].bgColor}
      color={options[theme].color}>
      {children}
    </SocialLoginBtnStyle>
  );
};

export default SocialLoginBtn;
