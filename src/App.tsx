import AOS from "aos";
import { SonnerToaster } from "./components/common";
import { Router } from "./router";
import "aos/dist/aos.css";

AOS.init();

function App() {
	return (
		<>
			<Router />

			<SonnerToaster />
		</>
	);
}

export default App;
