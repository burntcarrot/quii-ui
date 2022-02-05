import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";

// fonts
import "@fontsource/raleway/latin.css";
import "@fontsource/inter/latin.css";

import App from "./App";
import { theme } from "./lib/styles/customTheme";

ReactDOM.render(
  <StrictMode>
    <CookiesProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </CookiesProvider>
  </StrictMode>,
  document.getElementById("root")
);
