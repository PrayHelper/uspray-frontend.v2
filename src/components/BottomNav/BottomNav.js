import { useState } from "react";
import { Link } from "react-router-dom";
import { BottomNavStyle } from "./style";

const BottomNav = () => {
  const [activeNav, setActiveNav] = useState(1);

  return (
    <BottomNavStyle>
      <div>
        <Link to="/main" onClick={() => setActiveNav(1)}>
            {activeNav === 1 ? (
              <img src="images/ic_main_filled.svg" alt="filled_main_icon" />
            ) : (
              <img src="images/ic_main.svg" alt="main_icon" />
            )}
        </Link>
      </div>
      <div>
        <Link to="/locker" onClick={() => setActiveNav(2)}>
          {activeNav === 2 ? (
            <img src="images/ic_locker_filled.svg" alt="filled_locker_icon" />
          ) : (
            <img src="images/ic_locker.svg" alt="locker_icon" />
          )}
        </Link>
      </div>
      <div>
        <Link to="/history" onClick={() => setActiveNav(3)}>
          {activeNav === 3 ? (
            <img src="images/ic_history_filled.svg" alt="filled_history_icon" />
          ) : (
            <img src="images/ic_history.svg" alt="history_icon" />
          )}
        </Link>
      </div>
      <div>
        <Link to="/settings" onClick={() => setActiveNav(4)}>
          {activeNav === 4 ? (
            <img src="images/ic_setting_filled.svg" alt="filled_setting_icon" />
          ) : (
            <img src="images/ic_setting.svg" alt="setting_icon" />
          )}
        </Link>
      </div>
    </BottomNavStyle>
  );
};

export default BottomNav;
