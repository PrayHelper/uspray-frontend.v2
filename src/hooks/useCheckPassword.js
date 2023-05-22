import { usePostFetcher } from "./api";

export const useCheckPassword = async (url, data, onSuccess) => {
  return await usePostFetcher(url, data, onSuccess);
};