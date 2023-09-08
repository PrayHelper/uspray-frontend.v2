import {
  CheckboxStyle,
  CheckboxWrapper,
  StyledLabel,
  StyledLinkLabel,
} from "./style";

const Checkbox = ({ id, label, link, linklabel, checked, handler }) => {
  return (
    <CheckboxWrapper>
      <CheckboxStyle
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={handler}
      ></CheckboxStyle>
      <StyledLinkLabel to={link}>{linklabel}</StyledLinkLabel>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
    </CheckboxWrapper>
  );
};

export default Checkbox;
