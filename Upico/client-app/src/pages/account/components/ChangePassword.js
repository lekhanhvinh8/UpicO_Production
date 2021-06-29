import {
  Avatar,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import useStyles from "./styles/changePasswordStyles";

import { UserService } from "../../../services/services";
import BottomNotification from "../../../components/BottomNotification";

import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const ChangePassword = () => {
  const classes = useStyles();

  const [user, setUser] = useState({});
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const [open, setOpen] = useState(false);

  const username = localStorage.getItem("username");

  const changeOldPassword = (e) => {
    setOldPassword(e.target.value);
    if (
      (e.target.value !== "") &
      (newPassword !== "") &
      (confirmPassword !== "")
    ) {
      setIsValid(true);
    } else setIsValid(false);
  };

  const changeNewPassword = (e) => {
    setNewPassword(e.target.value);
    if (
      (oldPassword !== "") &
      (e.target.value !== "") &
      (confirmPassword !== "")
    ) {
      setIsValid(true);
    } else setIsValid(false);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if ((oldPassword !== "") & (newPassword !== "") & (e.target.value !== "")) {
      setIsValid(true);
    } else setIsValid(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (validate()) {
      UserService.changePassword(
        username,
        oldPassword,
        newPassword,
        confirmPassword
      ).then((response) => {
        if (response.status === 404) {
          document.body.style.overflow = "hidden";
          setError("Your current password is incorrect.");
        } else {
          setError("");
        }
        if (response.status === 400) {
          document.body.style.overflow = "hidden";
          setError(
            "The new password and the current password cannot be the same."
          );
        }
        if (response.status === 200) {
          setOpen(true);
          setError("");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      });
      document.body.style.overflow = "auto";
    }
  };

  const validate = () => {
    let isValid = true;

    if (newPassword !== confirmPassword) {
      setError("New password and old password do not match.");
      isValid = false;
    } else if (
      !RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})").test(newPassword)
    ) {
      setError(
        "Password must be six charaters and contain at least lowercase character, uppercase character, numeric character."
      );
      isValid = false;
    } else {
      setError("");
    }

    return isValid;
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    UserService.getProfile(username, username).then((response) => {
      if (response.status === 200) {
        setUser(response.data);
      }
    });
  }, [username]);
  return (
    <div>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px" }}>
          <Avatar
            src={user.avatarUrl ? user.avatarUrl : null}
            alt="avatar"
            className={classes.avatar}
          />
        </div>
        <div className={classes.gridItemInfo}>
          <Typography variant="body1" className={classes.username}>
            {user.userName ? user.userName : ""}
          </Typography>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Old password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={oldPassword}
            onChange={changeOldPassword}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          New password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={newPassword}
            onChange={changeNewPassword}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Confirm password
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            type="password"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={confirmPassword}
            onChange={changeConfirmPassword}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Button
            color="primary"
            variant="contained"
            style={{ textTransform: "inherit" }}
            onClick={handleClick}
            disabled={!isValid}
          >
            Change password
          </Button>
        </div>
      </Grid>
      <BottomNotification error={error} />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Change password successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangePassword;
