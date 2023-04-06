import styled from "styled-components";
import Input from "../../Input/Input";

const CheckId = (props) => {
  return (
    <div style={{ textAlign: "center" }}>
      <Input
        labelName={"아이디"}
        nextRouter={"pwd"}
        onChangeId={props.onChangeId}
      />
      <div style={{ marginTop: "16px", marginBottom: "52px" }}>
        <SubLink href="/findId">아이디를 잊으셨나요?</SubLink>
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
