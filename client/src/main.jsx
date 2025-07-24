//<Outlet /> is a placeholder component from react-router-dom that is used to render child routes.
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

createRoot(document.getElementById("root")).render( 
  <BrowserRouter>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>
        <App />
        <Toaster richColors />
      </Provider>
    </ThemeProvider> 
    {/* <Provider store={store}>
      <App />
      <Toaster richColors />
    </Provider>    */}
  </BrowserRouter>
); 
