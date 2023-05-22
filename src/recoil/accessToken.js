import { atom } from 'recoil';

export const tokenState = atom({
  key: "myAccessToken",
  default: "test",
});