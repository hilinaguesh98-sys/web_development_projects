import { useMemo } from "react";
import PropTypes from "prop-types";

import { ThemeContext } from "./ThemeContext";

function ThemeProvider({ children }) {
  const value = useMemo(() => ({ theme: "light" }), []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = { children: PropTypes.node.isRequired };

export default ThemeProvider;