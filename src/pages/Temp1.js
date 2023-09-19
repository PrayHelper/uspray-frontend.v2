import { useEffect } from "react";
import useToast from "../hooks/useToast";
import { ToastTheme } from "../components/Toast/Toast";
import { useNavigate } from "react-router-dom";

const Temp1 = () => {
  const { showToast } = useToast({});

  const navigate = useNavigate();

  return (
    <div>
      Temp1
      <button
        onClick={() => {
          showToast({
            theme: ToastTheme.ERROR,
            message: "페이지 전환 + showToast 수행",
          });
          navigate("/temp2");
        }}>
        Click Me!
      </button>
    </div>
  );
};

export default Temp1;
