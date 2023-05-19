import styled from 'styled-components';
import IcWhiteCheck from '../../images/ic_white_check.svg';

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  width: 24px;
  height: 24px;
  border: 2px solid #7BAB6E;
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcWhiteCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 13.31px 9.07px;
    background-color: #7BAB6E;
  }
`;

export const StyledLabel = styled.div`
  color: #A0A0A0;
  font-size: 14px;
`;