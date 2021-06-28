import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import useStyles from "./styles/loginStyles";
import CardLogin from "./components/CardSignin";
import CardRegister from "./components/CardSignup";
import AccountContext from "./accountContext";

const Login = () => {
  const classes = useStyles();
  const [active, setActive] = useState("signin");

  const switchToSignup = () => {
    setTimeout(() => {
      setActive("signup");
    }, 600);
  };

  const switchToSignin = () => {
    setTimeout(() => {
      setActive("signin");
    }, 600);
  };

  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
      <div className={classes.root}>
        <div className={classes.background}>
          <Grid
            container
            justify="center"
            spacing={0}
            direction="column"
            className={classes.container}
            active={active}
          >
            <Grid item xs={12} sm={6} style={{ width: "400px" }}>
              {active === "signin" && <CardLogin />}
              {active === "signup" && <CardRegister />}
            </Grid>
          </Grid>
        </div>
      </div>
    </AccountContext.Provider>
  );
};

export default Login;
