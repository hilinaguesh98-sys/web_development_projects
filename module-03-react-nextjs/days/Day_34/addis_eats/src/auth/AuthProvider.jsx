import { useMemo, useState } from "react";
import PropTypes from "prop-types";

import { AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("addis-eats-auth") === "true"
  );

  const value = useMemo(
    () => ({
      isAuthenticated,
      signIn: () => {
        localStorage.setItem("addis-eats-auth", "true");
        setIsAuthenticated(true);
      },
    }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

export default AuthProvider;