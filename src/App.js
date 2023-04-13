import "./App.css";
import { Reset } from "styled-reset";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Main from "./pages/Main";
import LoginPage from "./components/Login/Page/LoginPage/LoginPage";
import FindId from "./pages/FindId";
import FindPwd from "./pages/FindPwd";
import Settings from "./pages/Settings";
import History from "./pages/History";
import BottomNav from "./components/BottomNav/BottomNav";

const Container = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin-bottom: 48px;
`;

function App() {
  return (
    <Container>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/login/*" element={<LoginPage />}></Route>
          <Route path="/findId" element={<FindId />}></Route>
          <Route path="/findPwd" element={<FindPwd />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/settings" element={<Settings />}></Route>
          <Route path="/history" element={<History />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
      <BottomNav></BottomNav>
    </Container>
  );
}

export default App;
