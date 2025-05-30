import { useEffect, useState } from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthForm from "@/components/auth/AuthForm";
import { useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/", { replace: true });
      } else {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, [navigate]);

  if (checkingAuth) return <p>Redirecting...</p>;
  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
      <AuthForm type="signup" />
    </AuthContainer>
  );
};

export default SignUpPage;
