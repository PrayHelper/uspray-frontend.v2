import styled from 'styled-components';
import IcGrayCheck from '../../images/ic_gray_check.svg';

export const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CheckboxStyle = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  border: 1px solid #CECECE;
  border-radius: 3px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${IcGrayCheck});
  background-size: 0px 0px;
  background-repeat: no-repeat;
  background-position: 50%;
  flex-shrink: 0;

  &:checked {
    transition: all 0.2s;
    border-color: transparent;
    background-size: 10px 7px;
    background-color: #CECECE;
  }
`;

export const StyledLabel = styled.div`
  color: #A0A0A0;
  font-size: 14px;
`;
