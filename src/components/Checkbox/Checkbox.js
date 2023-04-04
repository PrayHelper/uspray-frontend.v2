import { CheckboxStyle, CheckboxWrapper, StyledLabel } from "./style"

const Checkbox = ({id, label}) => {
  return (
    <CheckboxWrapper>
      <CheckboxStyle type="checkbox" id={id} name={id}></CheckboxStyle>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;