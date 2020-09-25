import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import "./App.css";
import Main from "./components/Main";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ab47bc",
    },
    secondary: {
      main: "#ff5252",
    },
    danger: {
      main: "#d50000",
    },
  },
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#ba68c8",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      {" "}
      <div className="App">
        <Main />
      </div>
    </ThemeProvider>
  );
};

export default App;
