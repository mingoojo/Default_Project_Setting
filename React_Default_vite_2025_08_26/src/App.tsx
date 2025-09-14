import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/Globalstyle";
import { Reset } from "styled-reset";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ThemeProvider } from "styled-components";
import defaultTheme from "./styles/defaultTheme";

function App() {
  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <ThemeProvider theme={defaultTheme}>
        <Reset />
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
