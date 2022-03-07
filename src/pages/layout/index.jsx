import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = ({ machine }) => {
  const { user } = machine.context;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
