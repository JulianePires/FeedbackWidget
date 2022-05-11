import { Dashboard } from "./components/Dashboard";
import { LandingPage } from "./components/LandingPage";
import { Widget } from "./components/Widget";
import { useAuth } from "./contexts/AuthContext";

export function App() {
  const { authenticated } = useAuth();

  return (
    <>
      {authenticated ? <Dashboard /> : <LandingPage />}
      <Widget />
    </>
  );
}
