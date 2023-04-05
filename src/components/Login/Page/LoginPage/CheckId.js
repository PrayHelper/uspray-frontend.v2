import styled from "styled-components";
import Input from "../../Input/Input";

const CheckId = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Input labelName={"아이디"} nextRouter={"pwd"} />
      <div style={{ marginTop: "16px", marginBottom: "52px" }}>
        <SubLink>아이디를 잊으셨나요?</SubLink>
      </div>
    </div>
  );
};

export default CheckId;

const SubLink = styled.a`
  color: #7bab6e;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
