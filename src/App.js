import "./App.css";
import { Reset } from "styled-reset";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Router,
} from "react-router-dom";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import LoginPage from "./components/Login/LoginPage";
import Settings from "./pages/Settings";
import History from "./pages/History";
import BottomNav from "./components/BottomNav/BottomNav";
import Locker from "./pages/Locker";
import CheckInfo from "./pages/CheckInfo";
import ToS from "./pages/ToS";
import Find from "./pages/Find";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ChangeInfo from "./pages/ChangeInfo";

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
  return (
    <ContainerWrapper>
      <Container>
        <Reset />
        <Routes>
          <Route element={<BottomNav />}>
            <Route path="/main" element={<Main />} />
            <Route path="/history" element={<History />} />
            <Route path="/locker" element={<Locker />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/findAccount" element={<Find />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkInfo" element={<CheckInfo />} />
          <Route path="/changeInvo" element={<ChangeInfo />} />
          <Route path="/tos" element={<ToS />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
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
