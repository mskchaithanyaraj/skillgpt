import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "./AuthInput";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/lib/supabaseClient";
import toast from "react-hot-toast";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues | SignUpValues>({
    resolver: zodResolver(type === "signin" ? signInSchema : signUpSchema),
  });

  const onSubmit: SubmitHandler<SignInValues | SignUpValues> = async (data) => {
    setLoading(true);
    if (type === "signup") {
      const { name, nickname, email, password } = data as SignUpValues;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, nickname },
          emailRedirectTo: `${import.meta.env.VITE_APP_ORIGIN}`,
        },
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signup successful! Check your email to confirm.");
        navigate("/sign-in"); // <-- redirect to sign-in after signup success
      }
    } else {
      const { email, password } = data as SignInValues;
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed in successfully!");
        navigate("/"); // <-- redirect home after sign-in success
      }
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${import.meta.env.VITE_APP_ORIGIN}/auth/callback`,
        },
      });
    } catch (error: any) {
      setLoading(false);
      toast.error(error.message || "Google sign-in failed");
    }
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

        <Button
          type="submit"
          disabled={loading}
          isLoading={loading}
          className="w-full"
        >
          {loading
            ? type === "signin"
              ? "Signing In..."
              : "Signing Up..."
            : type === "signin"
            ? "Sign In"
            : "Sign Up"}
        </Button>

        <button
          type="button"
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-2 border border-input rounded-md py-2 text-sm hover:bg-accent"
          style={{ cursor: loading ? "wait" : "pointer" }}
          disabled={loading}
        >
          <img
            src="/assets/google-logo.png"
            alt="Google"
            width="20"
            height="20"
          />
          {loading ? "Processing..." : "Continue with Google"}
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
