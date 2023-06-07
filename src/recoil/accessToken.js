import { atom, } from 'recoil';

export const tokenState = atom({
  key: "myAccessToken",
  default: "",
});

export const deviceTokenState = atom({
  key: "deviceToken",
  default: "",
});