import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OverviewPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SkillGPT
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Master any skill with AI-powered personalized learning paths, smart
            breakdowns, and daily nudges.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link to="/sign-in" className="inline-block">
              <Button variant="outline" size="lg" asChild>
                <span className="cursor-pointer">Sign In</span>
              </Button>
            </Link>

            <Link to="/sign-up" className="inline-block">
              <Button size="lg" asChild>
                <span className="cursor-pointer">Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Footer */}
      <footer className="py-6 border-t border-border text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} SkillGPT. All rights reserved.
      </footer>
    </div>
  );
};

export default OverviewPage;
