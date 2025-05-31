import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

const ProtectedLayout = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
