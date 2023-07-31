import serverapi from "../api/serverapi";

// get 방식의 axios 호출
export const getFetcher = async (url, headers, params) => {
  const response = await serverapi
    .get(
      url,
      {
        responseType: 'json',
        headers: { ...headers, 'Content-Type': 'application/json' },
        params: params,
      }
    )
  return response;
}

// post 방식의 axios 호출
export const postFetcher = async (url, data, headers) => {
  const response = await serverapi
    .post(
      url,
      { ...data },
      {
        responseType: 'json',
        headers: { ...headers, 'Content-Type': 'application/json' },
      }
    )
  return response;
}

// put 방식의 axios 호출
export const putFetcher = async (url, data, headers) => {
  const response = await serverapi.put(
    url,
    { ...data },
    {
      responseType: "json",
      headers: { ...headers, "Content-Type": "application/json" },
    }
  );
  return response;
}

// delete 방식의 axios 호출
export const deleteFetcher = async (url, headers) => {
  const response = await serverapi.delete(
    url, 
    {
      responseType: "json",
      headers: { ...headers, "Content-Type": "application/json" },
    }
  );
  return response;
}

