import React from "react";
import AuthContainer from "@/components/auth/AuthContainer";
import AuthForm from "@/components/auth/AuthForm";

const SignUpPage = () => {
  return (
    <AuthContainer>
      <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
      <AuthForm type="signup" />
    </AuthContainer>
  );
};

export default SignUpPage;
