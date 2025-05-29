import { Route, Routes } from "react-router-dom";
import OverviewPage from "./pages/OverviewPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/overview" element={<OverviewPage />} />
    </Routes>
  );
};

export default App;
