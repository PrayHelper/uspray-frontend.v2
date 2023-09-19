import { atom } from "recoil";
import { ToastTheme } from "../components/Toast/Toast";

export const toastMessageState = atom({
  key: "toastMessage",
  default: "Plaese Initialize toastMessage!!!",
});

export const toastThemeState = atom({
  key: "toastTheme",
  default: ToastTheme.SUCCESS,
});

export const toastVisibleState = atom({
  key: "toastVisible",
  default: false,
});
