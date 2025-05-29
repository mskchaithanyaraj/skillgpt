import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthForm from "@/components/auth/AuthForm";

const SignInPage = () => {
  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">Welcome Back</h2>
      <AuthForm type="signin" />
    </AuthContainer>
  );
};

export default SignInPage;
