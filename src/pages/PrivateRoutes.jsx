import { Navigate, Outlet, ScrollRestoration } from "react-router-dom";
import { useAuth } from "../api/hooks/useAuth";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated())
    return (
      <Navigate
        to={`/login`}
        //   state={{ from: pathname }}
      />
    );

  return (
    <>
      <ScrollRestoration />

      <Outlet />
    </>
  );
};

export default PrivateRoutes;
