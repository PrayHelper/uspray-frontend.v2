import Input from "../../Input/Input";
import styled from "styled-components";
import Input2 from "../../Input/Input2";

const CheckPwd = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Input2
        labelName={"아이디"}
        nextRouter={"test"}
        idValue={props.idValue}
      />
      <Input labelName={"비밀번호"} nextRouter={"test"} />
      <div style={{ marginTop: "16px", marginBottom: "52px" }}>
        <SubLink href="/findPwd">비밀번호를 잊으셨나요?</SubLink>
      </div>
    </div>
  );
};

export default CheckPwd;

const SubLink = styled.a`
  color: #7bab6e;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
