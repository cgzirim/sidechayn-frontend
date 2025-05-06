import useAuth from "../auth/store";

const useBearer = () => {
  const { user } = useAuth();
  return { Authorization: `Bearer ${user?.access}` };
};

export default useBearer;
