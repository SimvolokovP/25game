import "./normalize.css";
import "./index.css";
import "@ant-design/v5-patch-for-react-19";

import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import "./index.css";
import "./mockEnv.ts";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { init } from "./init.ts";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const startApp = async () => {
  try {
    const launchParams = retrieveLaunchParams();

    const { tgWebAppPlatform: platform } = launchParams;
    const debug =
      (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
      import.meta.env.DEV;

    await init({
      debug,
      eruda: debug && ["ios", "android"].includes(platform),
      mockForMacOS: platform === "macos",
    });

    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>
    );
  } catch (e) {
    console.error("Error during initialization:", e);
    root.render(<div>Error during initialization</div>);
  }
};

startApp();
