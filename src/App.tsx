import { Routes, Route } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import OAuthCallback from "./pages/OAuthCallback";
import HomePage from "./pages/HomePage";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/auth/callback" element={<OAuthCallback />} />

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          className: "bg-gray-800 text-white",
          style: {
            fontSize: "16px",
            padding: "12px 16px",
          },
        }}
      />
    </>
  );
};

export default App;
