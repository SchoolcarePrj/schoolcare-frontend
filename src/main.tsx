import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "remixicon/fonts/remixicon.css";

createRoot(document.querySelector("#root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>
);
