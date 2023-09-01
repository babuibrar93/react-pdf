import ReactDOM from "react-dom/client";
import App from "../../example/src/App";

export const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<App />);
