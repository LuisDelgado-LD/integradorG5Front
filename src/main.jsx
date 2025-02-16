import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GlobalProvider } from "./Context/utils/globalContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);