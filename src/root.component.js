
import { auth$ as auth, logout } from "@demo/auth";
import * as singleSpa from 'single-spa';
import React, { useEffect, useState } from "react";

export default function Root(props) {
  const [needsLogin, setNeedsLogin] = useState(Boolean);

  const ROUTES = {
    LOGIN: "/login",
    HOME: "/home",
  };
 const nav = {
    background: "crimson",
    color: "white",
    padding: "1rem 2rem",
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  };

  useEffect(() => {
    const sub = auth.subscribe(({ sessionToken }) => {
      console.log("onMount navbar",sessionToken);
      const _needsLogin = !sessionToken;
      setNeedsLogin(_needsLogin);
      if (needsLogin) singleSpa.navigateToUrl(ROUTES.LOGIN);
      else if (!needsLogin && window.location.pathname === ROUTES.LOGIN) {
        singleSpa.navigateToUrl(ROUTES.HOME);
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [needsLogin]);

  return (
    <div style={nav}>
      {needsLogin ? 
              <span>Login</span>
            :
        <>
        <span style={{ textAlign: "center", padding: "1rem" }}>Welcome!</span>
        <button class="action" type="button" onClick={logout}>Logout</button>
        </>
      }
    </div>
  );
}
