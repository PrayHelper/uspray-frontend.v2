import { useEffect } from "react";
import serverapi from "../api/serverapi";

const NaverOAuth = () => {
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const execute = async () => {
      try {
        // prefix url이 달라서 fetch 사용. 이후 변경 필요.
        // const url = `https://api.intg.uspray.kr/api/user/oauth/kakao/${code}`;

        // // const res = await fetch(url, { headers: { "content-type": "json" } });

        const api = `/user/oauth/kakao/${code}`;

        const res = serverapi.get(api);

        const json = await res.json();
        console.log("json: ", json);

        // const ACCESS_TOKEN = json.data.accessToken;

        // console.log(ACCESS_TOKEN);
      } catch (err) {
        console.log(err);

        alert("로그인 실패");
      }
    };

    execute();
  }, []);

  return <div>NaverOAuth</div>;
};

export default NaverOAuth;
