import { useEffect } from "react";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { useNavigate } from "react-router-dom";

const Temp1 = () => {
  const { setToastMessage, setToastTheme, showToast } = useToast({});

  const navigate = useNavigate();

  return (
    <div>
      Temp1
      <button
        onClick={() => {
          setToastMessage("Temp1");
          showToast();
          navigate("/temp2");
        }}>
        Click Me!
      </button>
    </div>
  );
};

export default Temp1;
