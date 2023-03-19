import styled from 'styled-components';

const InputContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  border: 1px solid #7BAB6E;
  border-radius: 16px;
  padding: 16.5px 14px;
`

const InputBirthStyle = styled.input`
  border: none;
  border-bottom: 1px solid #7BAB6E;
  &:focus {
    outline: none;
  };
  width: fit-content;
  min-width: 20px;
  max-width: 20px;
  color: #7BAB6E;
  font-size: 16px;
  margin-right: 5px;
`

const InputBirth = () => {
  return(
    <div style={{ position: "relative", display: "flex", flexDirection: "column", verticalAlign: "top: 0", height: "56px"}}>
      <InputContainerStyle>
        <span style={{zIndex: "1", backgroundColor: "white", fontSize: "12px", color: "#7BAB6E", position: "absolute", top: "0", transform: "translate(-5px, -5px)", padding: "0 5px" }}>생년월일</span>
        <div style={{display: "flex", width: "100%", justifyContent:"space-evenly", alignItems: "center"}}>
          <div style={{color: "#5C6E56"}}>
            <InputBirthStyle style={{maxWidth: "38px"}} type="number"/>
            년
          </div>
          <div style={{width: "16px", transform: "rotate(90deg)", borderBottom: "1px solid #7BAB6E"}}></div>
          <div style={{color: "#5C6E56"}}>
            <InputBirthStyle type="number"/>
            월
          </div>
          <div style={{width: "16px", transform: "rotate(90deg)", borderBottom: "1px solid #7BAB6E"}}></div>
          <div style={{color: "#5C6E56"}}>
            <InputBirthStyle type="number"/>
            일
          </div>
        </div>
      </InputContainerStyle>
    </div>
  );
};

export default InputBirth;