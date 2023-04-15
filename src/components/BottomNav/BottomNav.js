import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavStyle } from "./style";


const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);
  const location = useLocation();

  useEffect(() => {
    let active_url = location.pathname;

    switch (active_url) {
      case "/main":
        setActiveNav(1);
        break;
      case "/locker":
        setActiveNav(2);
        break;
      case "/history":
        setActiveNav(3);
        break;
      case "/settings":
        setActiveNav(4);
        break;
      default:
        setActiveNav(1);
    }
  }, []);

  return (
    <BottomNavStyle>
      <Link to="/main" onClick={() => setActiveNav(1)}>
        <div style={{ padding: "20px" }}>
          {activeNav === 1 ? (
            <img src="images/ic_main_filled.svg" alt="filled_main_icon" />
          ) : (
            <img src="images/ic_main.svg" alt="main_icon" />
          )}
        </div>
      </Link>
      <Link to="/locker" onClick={() => setActiveNav(2)}>
        <div style={{ padding: "20px" }}>
          {activeNav === 2 ? (
            <img src="images/ic_locker_filled.svg" alt="filled_locker_icon" />
          ) : (
            <img src="images/ic_locker.svg" alt="locker_icon" />
          )}
        </div>
      </Link>
      <Link to="/history" onClick={() => setActiveNav(3)}>
        <div style={{ padding: "20px" }}>
          {activeNav === 3 ? (
            <img src="images/ic_history_filled.svg" alt="filled_history_icon" />
          ) : (
            <img src="images/ic_history.svg" alt="history_icon" />
          )}
        </div>
      </Link>
      <Link to="/settings" onClick={() => setActiveNav(4)}>
        <div style={{ padding: "20px" }}>
          {activeNav === 4 ? (
            <img src="images/ic_setting_filled.svg" alt="filled_setting_icon" />
          ) : (
            <img src="images/ic_setting.svg" alt="setting_icon" />
          )}
        </div>
      </Link>
    </BottomNavStyle>
  );
};

export default BottomNav;
