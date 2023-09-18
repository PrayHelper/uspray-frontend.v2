import Button from "../Button/Button";
import {
  ModalWrapper,
  ModalIcon,
  ModalMainContent,
  ModalSubContent,
  ModalBtnWrapper,
} from "./style";

export const ModalTheme = {
  NORMAL: 0,
  WARNING: 2,
};

Object.freeze(ModalTheme);

const Modal = (props) => {
  const isModalOn = props.isModalOn !== undefined ? props.isModalOn : true;

  const modalTheme =
    props.modalTheme !== undefined ? props.modalTheme : ModalTheme.NORMAL;

  return (
    <ModalWrapper isModalOn={isModalOn} onClick={(e) => e.stopPropagation()}>
      <ModalIcon src={props.iconSrc} alt={props.iconAlt} />
      <ModalMainContent modalTheme={modalTheme}>
        {props.mainContent}
      </ModalMainContent>
      <ModalSubContent modalTheme={modalTheme}>
        {props.subContent}
      </ModalSubContent>
      <ModalBtnWrapper>
        {props.btnContent2 && (
          <Button buttonSize={2} buttonTheme={1} handler={props.onClickBtn2}>
            {props.btnContent2}
          </Button>
        )}
        <Button
          buttonSize={2}
          buttonTheme={modalTheme}
          handler={props.onClickBtn}
        >
          {props.btnContent}
        </Button>
      </ModalBtnWrapper>
    </ModalWrapper>
  );
};

export default Modal;
