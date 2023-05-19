import { CheckboxStyle, CheckboxWrapper, StyledLabel } from "./style";

const GreenCheckbox = ({ id, label, checked, handler }) => {
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

export default GreenCheckbox;
