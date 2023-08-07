import "./App.css";
import { Reset } from "styled-reset";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Outlet,
  useLocation,
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
import { useRecoilState, useRecoilValue } from "recoil";
import { authValueState } from "./recoil/user";

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




const RouteHandler = () => {

  const navigate = useNavigate()

  const location = useLocation();

  const currentPath = encodeURIComponent(location.pathname.slice(1));

  useEffect(() => {
    navigate(`/loading?redirect=${currentPath}`)
  }, [])

  return (
  <Routes>
    <Route element={<Outlet/>}>
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
      <Route path="/tos" element={<ToS />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/social" element={<SocialLogin />} />
    </Route>

    <Route element={<Outlet/>}>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/findAccount" element={<Find />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/loading" element={<SplashScreen />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
  )
}



function App() {
  return (
    <BrowserRouter>
      <ContainerWrapper>
        <Container>
        <Reset />
        <RouteHandler/>
        </Container>
      </ContainerWrapper>
    </BrowserRouter>
  );
}

export default App;
