import "./App.css";
import { Reset } from "styled-reset";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Locker from "./pages/Locker";
import LoginPage from "./components/Login/LoginPage";
import Settings from "./pages/Settings";
import History from "./pages/History";
import BottomNav from "./components/BottomNav/BottomNav";
import CheckInfo from "./pages/CheckInfo";
import ToS from "./pages/ToS";
import PrivacyProcessAgreement from "./pages/PrivacyProcessAgreement";
import Find from "./pages/Find";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ChangeInfo from "./pages/ChangeInfo";
import ChangePw from "./pages/ChangePw";
import ChangePhoneNumber from "./pages/ChangePhoneNumber";
import SocialLogin from "./pages/SocialLogin";
import useAuthToken from "./hooks/useAuthToken";
import useRefresh from "./hooks/useRefresh";
import { useEffect } from "react";
import SplashScreen from "./pages/SplashScreen";

const ContainerWrapper = styled.div`
  max-width: 430px;
  margin: 0 auto;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
`;

function MainApp() {
  function PrivateRoute() {
    const { getAccessToken, getRefreshToken } = useAuthToken();
    const { refresh } = useRefresh();

    // console.log("refresh : ", await getRefreshToken());
    // console.log("access : ", getAccessToken());

    useEffect(() => {
      // if (!getRefreshToken()){
      //   console.log("aa");
      //   return <Navigate replace to ='/' />
      // }
      // if (!getAccessToken()){
      //   console.log("bb");
      //   console.log("accessToken: ", getAccessToken());
      //   console.log("refresh:" , await getRefreshToken());
      //   const getToken = async () => {
      //     await refresh();
      //   };
      //   getToken();
      // }

      return <Outlet />;
    });

    return <Login />;
  }

  return (
    <ContainerWrapper>
      <Container>
        <Reset />
        <Routes>
          {/* 로그인해야지 접근 가능 */}
          <Route element={<PrivateRoute />}>
            {/* 바텀바가 보이는 페이지들 */}
            <Route element={<BottomNav />}>
              <Route path="/main" element={<Main />} />
              <Route path="/history" element={<History />} />
              <Route path="/locker" element={<Locker />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="/checkInfo" element={<CheckInfo />} />
            <Route path="/changeInfo" element={<ChangeInfo />} />
            <Route path="/changePw" element={<ChangePw />} />
            <Route path="/changePhoneNumber" element={<ChangePhoneNumber />} />

            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/social" element={<SocialLogin />} />
          </Route>

          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/findAccount" element={<Find />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/tos" element={<ToS />} />
          <Route
            path="/privacyProcessAgreement"
            element={<PrivacyProcessAgreement />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </ContainerWrapper>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}

export default App;
