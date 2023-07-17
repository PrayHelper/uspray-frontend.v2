import { useState } from "react";
import {
  DescriptionStyle,
  InputStyle,
  LabelStyle,
  WrapperStyle,
} from "./style";

const Input = ({
  type,
  label,
  placeholder,
  description,
  isError,
  onChangeHandler,
  onFocusHandler,
  value,
  setIsScaleLogo,
}) => {
  if (!type) type = "text";
  if (!label) label = "";
  if (!onFocusHandler)
    onFocusHandler = () => {
    };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <WrapperStyle isFocused={isFocused} isError={isError}>
      <LabelStyle isFocused={isFocused || value} isError={isError}>
        {label}
      </LabelStyle>
      <InputStyle
        type={type}
        value={value}
        placeholder={isFocused ? placeholder : ""}
        isError={isError}
        onChange={onChangeHandler}
        onFocus={() => {
          if(window.location.pathname === '/login') {
            setIsScaleLogo(true);
          }
          setIsFocused(true);
          onFocusHandler();
        }}
        onBlur={() => {
          if(window.location.pathname === '/login') {
            setIsScaleLogo(false);
          }
          setIsFocused(false);
        }}
      />
      {description && (
        <DescriptionStyle isError={isError}>{description}</DescriptionStyle>
      )}
    </WrapperStyle>
  );
};

export default Input;
