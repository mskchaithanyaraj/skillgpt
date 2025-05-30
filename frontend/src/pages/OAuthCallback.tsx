import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("OAuth Callback Data:", data);
      if (error) {
        console.error(error);
        return;
      }
      navigate("/", { replace: true });
    };

    processOAuth();
  }, [navigate]);

  return <p>Processing login...</p>;
};

export default OAuthCallback;
