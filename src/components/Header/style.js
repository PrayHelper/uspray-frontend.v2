import styled from "styled-components";

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  position: fixed;
  top: 0;
  z-index: 1;
`;

export const HeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: bold;
  padding: 18px 16px 19px 16px;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-secondary-grey);
`;

export const BtnWrapper = styled.div`
  display: flex;
  text-align: center;
  font-size: 14px;
`;

export const MyBtn = styled.div`
  flex-grow: 1;
  padding: 14px;
  background-color: var(--color-green);
  color: var(--color-white);
`;

export const SharedBtn = styled.div`
  flex-grow: 1;
  padding: 14px;
  background-color: var(--color-white);
  color: var(--color-secondary-grey);
`;
