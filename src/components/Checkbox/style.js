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

  &:checked {
    border-color: transparent;
    background-image: url(${IcGrayCheck});
    background-size: 10px 7px;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #CECECE;
  }
`;

export const StyledLabel = styled.div`
  color: #A0A0A0;
  font-size: 14px;
`;