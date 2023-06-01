import IcWhiteCheck from '../../images/ic_white_check.svg';
import styled from 'styled-components';

const ShareCheckBox = ({ id, label, checked, handler }) => {
  return (
    <CheckboxWrapper>
      <CheckboxStyle
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={handler}
      ></CheckboxStyle>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </CheckboxWrapper>
  );
};

export default ShareCheckBox;



const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #7BAB6E;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcWhiteCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;
  margin-bottom: 14px;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 13.31px 9.07px;
    background-color: #7BAB6E;
  }
`;

const StyledLabel = styled.div`
  color: #A0A0A0;
  font-size: 14px;
`;