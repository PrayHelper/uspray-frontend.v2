import serverapi from "../api/serverapi";

const refresh = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

    const api = "/user/token";

    try {
      const res = await serverapi.get(api, {
        headers: {
          Authorization: `${refreshToken}`,
        }
      });
      if (res.status === 200) {
        return (res.data.access_token);
      }
    } catch(e) {
      console.log(e);
    }

};

export default refresh;