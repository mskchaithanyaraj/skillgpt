import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "./AuthInput";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import supabase from "@/lib/supabaseClient";

// Define form schema types
const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(2),
  nickname: z.string().optional(),
});

type SignInValues = z.infer<typeof signInSchema>;
type SignUpValues = z.infer<typeof signUpSchema>;

type AuthType = "signin" | "signup";

interface AuthFormProps {
  type: AuthType;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues | SignUpValues>({
    resolver: zodResolver(type === "signin" ? signInSchema : signUpSchema),
  });

  const onSubmit: SubmitHandler<SignInValues | SignUpValues> = async (data) => {
    if (type === "signup") {
      const { name, email, password } = data as SignUpValues;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${import.meta.env.VITE_APP_ORIGIN}`,
        },
      });
      if (error) alert(error.message);
    } else {
      const { email, password } = data as SignInValues;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) alert(error.message);
    }
  };

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${import.meta.env.VITE_APP_ORIGIN}/`,
      },
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === "signup" && (
          <>
            <AuthInput
              label="Full Name"
              id="name"
              type="text"
              register={register}
              errors={errors}
              required
            />
            <AuthInput
              label="Nickname (optional)"
              id="nickname"
              type="text"
              register={register}
              errors={errors}
            />
          </>
        )}

        <AuthInput
          label="Email"
          id="email"
          type="email"
          register={register}
          errors={errors}
          required
        />

        <AuthInput
          label="Password"
          id="password"
          type="password"
          register={register}
          errors={errors}
          required
        />

        <Button type="submit" className="w-full">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </Button>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-2 border border-input rounded-md py-2 text-sm hover:bg-accent"
        >
          <img src="/google-icon.svg" alt="Google" width="20" height="20" />
          Continue with Google
        </button>
      </form>

      <div className="text-center text-sm text-muted-foreground">
        {type === "signin" ? (
          <span>
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary hover:underline">
              Sign In
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
