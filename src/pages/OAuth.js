import { useEffect } from "react";

const OAuth = () => {
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    const execute = async () => {
      try {
        // prefix url이 달라서 fetch 사용. 이후 변경 필요.
        const url = `https://api.intg.uspray.kr/api/user/oauth/kakao/${code}`;
        console.log("url: ", url);

        const a = await fetch(url, { headers: { "content-type": "json" } });
        console.log(a);

        const json = await a.json();
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

  return <div>OAuth</div>;
};

export default OAuth;
