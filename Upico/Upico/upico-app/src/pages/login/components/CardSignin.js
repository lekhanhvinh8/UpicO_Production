import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Link,
} from "@material-ui/core";

import logo from "../../../assets/logo.jpg";
import useStyles from "./styles/cardStyles";

import AccountContext from "../accountContext";

import AuthService from "../../../services/auth.service";

const CardSignin = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let isError = false;

    if (username === "") {
      setError((prevError) => ({
        ...prevError,
        username: "Username is required.",
      }));
      isError = true;
    }
    if (username !== "") {
      setError((prevError) => ({
        ...prevError,
        username: "",
      }));
    }
    if (password === "") {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required.",
      }));
      isError = true;
    }
    if (password !== "") {
      setError((prevError) => ({
        ...prevError,
        password: "",
      }));
    }

    return isError;
  };

  const login = () => {
    if (!validate()) {
      AuthService.login(username, password).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", username);
          localStorage.setItem("data", JSON.stringify(response.data));
          window.location = window.location.origin;
        } else {    
          setError((prevError) => ({
            ...prevError,
            username: response.data,
          }));
        }
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  const { switchToSignup } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignin} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Username
          </Typography>
          <TextField
            error={error != null}
            fullWidth
            autoFocus
            className={classes.textField}
            onChange={changeUsername}
            helperText={error.username}
          />
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Password
          </Typography>
          <TextField
            error={error != null}
            fullWidth
            className={classes.textField}
            onChange={changePassword}
            type="password"
            helperText={error.password}
            onKeyPress={handleKeyPress}
          />
        </div>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button} onClick={login}>
          Login
        </Button>
        <Link href="#" className={classes.link}>
          Forgot password?
        </Link>
      </CardActions>
      <Typography
        className={classes.link}
        style={{ marginBottom: "10px", textAlign: "center" }}
      >
        Don't have an account?
        <Link
          href="#"
          className={classes.signUp}
          onClick={() => {
            switchToSignup();
            setAnimate(1);
          }}
        >
          Sign up
        </Link>
      </Typography>
    </Card>
  );
};

export default CardSignin;
