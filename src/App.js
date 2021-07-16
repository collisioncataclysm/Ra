import "flexlayout-react/style/dark.css";

import { useRoutes } from "hookrouter";

import ThothPageWrapper from "./features/common/ThothPage/ThothPageWrapper";
import Thoth from "./features/Thoth/Thoth";
import StartScreen from "./features/StartScreen/StartScreen";

import "./dds-globals/dds-globals.css";
import "./App.css";
import { useTabManager } from "./contexts/TabManager";

const routes = {
  "/": () => <Thoth />,
  "/home": () => <StartScreen />,
};

function App() {
  // Use our routes
  const match = useRoutes(routes);
  const { tabs } = useTabManager();

  return (
    <ThothPageWrapper tabs={tabs}>
      {/* TODO better not found page  */}
      {match || <h1>NOT FOUND</h1>}
    </ThothPageWrapper>
  );
}

export default App;
