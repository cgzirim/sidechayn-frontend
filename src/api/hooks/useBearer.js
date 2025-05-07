import { getToken } from "../tokenManagement";

const useBearer = () => {
  return { Authorization: `Bearer ${getToken("accessToken")}` };
};

export default useBearer;
