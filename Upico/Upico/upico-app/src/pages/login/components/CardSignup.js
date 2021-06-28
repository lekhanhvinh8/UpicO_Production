import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
  Link,
  Divider,
} from "@material-ui/core";

import logo from "../../../assets/logo.jpg";
import useStyles from "./styles/cardStyles";

import AccountContext from "../accountContext";

import AuthService from "../../../services/auth.service";

const CardSignup = () => {
  const classes = useStyles();
  const [animate, setAnimate] = useState(0);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState({});

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changeFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const changeLastname = (e) => {
    setLastname(e.target.value);
  };

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const validate = () => {
    let isError = false;
    if (!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email)) {
      setError((prevError) => ({ ...prevError, email: "Invalid email." }));
      isError = true;
    } else {
      setError((prevError) => ({ ...prevError, email: "" }));
    }

    if (email === "") {
      setError((prevError) => ({ ...prevError, email: "Email is required." }));
      isError = true;
    }

    if (firstname === "") {
      setError((prevError) => ({
        ...prevError,
        firstname: "Firstname is required.",
      }));
      isError = true;
    }
    if (firstname !== "") {
      setError((prevError) => ({
        ...prevError,
        firstname: "",
      }));
    }
    if (lastname === "") {
      setError((prevError) => ({
        ...prevError,
        lastname: "Lastname is required.",
      }));
      isError = true;
    }
    if (lastname !== "") {
      setError((prevError) => ({
        ...prevError,
        lastname: "",
      }));
    }
    if (username === "") {
      setError((prevError) => ({
        ...prevError,
        username: "Username is required.",
      }));
      isError = true;
    }

    if (username !== "") {
      if (username.length < 6) {
        setError((prevError) => ({
          ...prevError,
          username: "Username cant be less than 6 characters.",
        }));
        isError = true;
      } else
        setError((prevError) => ({
          ...prevError,
          username: "",
        }));
    }
    if (!RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(password)) {
      setError((prevError) => ({
        ...prevError,
        password:
          "Password must be six charaters and contain at least lowercase character, uppercase character, numeric character.",
      }));
      isError = true;
    } else {
      setError((prevError) => ({
        ...prevError,
        password: "",
      }));
    }
    if (password === "") {
      setError((prevError) => ({
        ...prevError,
        password: "Password is required.",
      }));
      isError = true;
    }

    return isError;
  };

  const signup = (e) => {
    e.preventDefault();

    if (!validate()) {
      const fullname = firstname + " " + lastname;
      AuthService.register(
        username,
        password,
        email,
        firstname,
        lastname,
        fullname
      ).then((response) => {
        if (response.status === 200) {
          alert("Đăng ký thành công");
        } else {
          setError((prevError) => ({
            ...prevError,
            email: response.data.emailError,
            username: response.data.usernameError,
          }));
        }
      });
    }
  };

  const { switchToSignin } = useContext(AccountContext);

  return (
    <Card className={classes.cardSignup} animate={animate}>
      <img src={logo} alt="title" className={classes.logo} />
      <CardContent>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Email
          </Typography>
          <TextField
            error={error != null}
            fullWidth
            autoFocus
            className={classes.textField}
            onChange={changeEmail}
            helperText={error.email}
          />
        </div>
        <div
          style={{
            marginBottom: 30,
            display: "flex",
          }}
        >
          <div>
            <Typography className={classes.text} variant="body1" gutterBottom>
              Firstname
            </Typography>
            <TextField
              error={error != null}
              fullWidth
              className={classes.textField}
              onChange={changeFirstname}
              helperText={error.firstname}
            />
          </div>
          <Divider
            orientation="vertical"
            style={{ margin: "0 10px" }}
            flexItem
          />
          <div>
            <Typography className={classes.text} variant="body1" gutterBottom>
              Lastname
            </Typography>
            <TextField
              error={error != null}
              fullWidth
              className={classes.textField}
              onChange={changeLastname}
              helperText={error.lastname}
            />
          </div>
        </div>
        <div style={{ marginBottom: 30 }}>
          <Typography className={classes.text} variant="body1" gutterBottom>
            Username
          </Typography>
          <TextField
            error={error != null}
            fullWidth
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
            type="password"
            onChange={changePassword}
            helperText={error.password}
          />
        </div>
      </CardContent>
      <CardActions className={classes.cardAction}>
        <Button variant="outlined" className={classes.button} onClick={signup}>
          Sign up
        </Button>
        <Typography className={classes.link} style={{ padding: "0 40px" }}>
          By signing up, you agree to our Terms, Data Policy and Cookies Policy
        </Typography>
      </CardActions>
      <Typography
        className={classes.link}
        style={{ marginBottom: "10px", textAlign: "center" }}
      >
        Have an account?
        <Link
          href="#"
          className={classes.signUp}
          onClick={() => {
            switchToSignin();
            setAnimate(1);
          }}
        >
          Login
        </Link>
      </Typography>
    </Card>
  );
};

export default CardSignup;
