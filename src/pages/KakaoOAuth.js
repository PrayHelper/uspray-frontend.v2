import { useEffect } from "react";
import serverapi from "../api/serverapi";
import { useNavigate } from "react-router";

const KakaoOAuth = () => {
  let code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  useEffect(() => {
    const execute = async () => {
      try {
        // prefix url이 달라서 fetch 사용. 이후 변경 필요.
        // const url = `https://api.intg.uspray.kr/api/user/oauth/kakao/${code}`;

        // // const res = await fetch(url, { headers: { "content-type": "json" } });

        const api = `/user/oauth/kakao/${code}`;
        console.log(api);

        const res = await serverapi.get(api);
        console.log(res);

        const json = await res.json();
        console.log("json: ", json);

        const userId = json.userId;
        console.log("userId: ", userId);

        navigate("/kakaoSignup", { userId });
      } catch (err) {
        console.log(err);

        alert("로그인 실패");
      }
    };

    execute();
  }, []);

  // LoadingSpinner가 있어야 함
  return <div>KakaoOAuth</div>;
};

export default KakaoOAuth;
