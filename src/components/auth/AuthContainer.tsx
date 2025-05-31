import React from "react";

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 p-8 rounded-lg shadow-md border border-border bg-card text-card-foreground">
        {children}
      </div>
    </div>
  );
};

export default AuthContainer;
