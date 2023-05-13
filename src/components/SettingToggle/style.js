import styled from "styled-components";

export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Toggle = styled.div`
  transition: all 0.3s;
  position: relative;
  width: 34px;
  height: 18px;
  border-radius: 16px;
  outline: none;
  padding: 0 2px;
  ${props => props.isToggleOn ?
    'background-color: #7BAB6E'
    : 'background-color: #CECECE'
  };

`;

export const ToggleButton = styled.div`
  transition: all 0.3s;
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 16px;
  margin-top: 2px;
  background-color: white;

  transform: ${props => props.isToggleOn ? 'translateX(20px)': 'translateX(0px)'};
`;