import { useEffect } from "react";

const OAuth = () => {
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(async () => {
    try {
      // prefix url이 달라서 fetch 사용. 이후 변경 필요.
      const url = `${process.env.REACT_APP_API_INTG}/oauth/kakao/${code}`;
      const a = await fetch(url);

      const json = await a.json();

      const ACCESS_TOKEN = json.data.accesToken;

      console.log(ACCESS_TOKEN);
    } catch (err) {
      console.log(err);

      alert("로그인 실패");
    }
  }, []);

  return <div>OAuth</div>;
};

export default OAuth;
