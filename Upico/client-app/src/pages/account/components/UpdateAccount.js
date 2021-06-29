import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useRef, useState } from "react";

import useStyles from "./styles/updateAccountStyles";

import { useLoading, useModal } from "../../../hooks/hooks";

import { UserService } from "../../../services/services";
import AvatarModal from "./AvatarModal";
import MuiAlert from "@material-ui/lab/Alert";

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const UpdateAccount = () => {
  const classes = useStyles();

  const modalRef = useRef(null);

  const [user, setUser] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [open, setOpen] = useState(false);

  const username = localStorage.getItem("username");

  const { loading, onLoading, offLoading } = useLoading();
  const { isShowing, toggle } = useModal();

  const changeDisplayName = (e) => {
    setUser({ ...user, displayName: e.target.value });
    if (!e.target.value) {
      setIsValid(false);
    }

    if (e.target.value && user.phoneNumber.length >= 10) {
      setIsValid(true);
    }
  };

  const changeBio = (e) => {
    setUser({ ...user, bio: e.target.value });
  };

  const changeFirstname = (e) => {
    setUser({ ...user, firstName: e.target.value });
  };

  const changeLastname = (e) => {
    setUser({ ...user, lastName: e.target.value });
  };

  const changePhone = (e) => {
    setUser({ ...user, phoneNumber: e.target.value });
    if (e.target.value.length < 10) {
      setIsValid(false);
    }

    if (e.target.value.length >= 10 && user.displayname !== "") {
      setIsValid(true);
    }
  };

  const updateProfile = () => {
    onLoading();
    UserService.updateProfile(
      user.userName,
      user.firstName,
      user.lastName,
      user.displayName,
      user.bio,
      user.phoneNumber
    ).then((response) => {
      if (response.status === 200) {
        offLoading();
        setOpen(true);
        document.body.style.overflow = "auto";
      }
    });
  };

  const changeAvatar = () => {
    toggle();
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    UserService.getProfile(username, username).then((response) => {
      if ((response.status === 200) & (Object.keys(user).length === 0)) {
        setUser(response.data);
      }
    });

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [username, modalRef, toggle, user]);

  return (
    <div>
      <AvatarModal
        isShowing={isShowing}
        toggleModal={toggle}
        modalRef={modalRef}
        onLoading={onLoading}
        offLoading={offLoading}
        setUser={setUser}
      />
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px", position: "relative" }}>
          <Avatar
            src={user.avatarUrl ? user.avatarUrl : null}
            alt="avatar"
            className={classes.avatar}
            onClick={changeAvatar}
            loading={loading ? 1 : 0}
          />
          {loading ? (
            <CircularProgress size={14} className={classes.progressAvatar} />
          ) : null}
        </div>
        <div className={classes.gridItemInfo}>
          <Typography variant="body1" className={classes.username}>
            {user.userName ? user.userName : ""}
          </Typography>
          <button
            variant="body1"
            className={classes.action}
            onClick={changeAvatar}
          >
            Change Avatar
          </button>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Display Name
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={user.displayName ? user.displayName : ""}
            onChange={changeDisplayName}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem} style={{ paddingTop: 0 }}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Typography className={classes.description} style={{ marginTop: 0 }}>
            Get a display name you use often to make your account easier to
            find. It can be your full name, nickname, or business name.
          </Typography>
        </div>
      </Grid>
      <Grid
        item
        className={classes.gridItem}
        style={{ alignItems: "flex-start" }}
      >
        <Typography variant="body1" className={classes.infoText}>
          Bio
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextareaAutosize
            className={classes.textArea}
            value={user.bio ? user.bio : ""}
            onChange={changeBio}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <div style={{ flex: "1 0 0px", textAlign: "right" }}></div>
        <div style={{ flex: "2 0 0px", marginLeft: 20 }}>
          <Typography
            variant="body1"
            className={classes.description}
            style={{ fontWeight: "bold" }}
          >
            Personal Information
          </Typography>
          <Typography className={classes.description} style={{ marginTop: 0 }}>
            Provide your personal information, regardless of whether you use the
            account for business, pets or otherwise. This information will not
            be visible on your public profile.
          </Typography>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Firstname
        </Typography>
        <div className={classes.gridItemInfo}>
          <div style={{ width: "75%", display: "flex", alignItems: "center" }}>
            <TextField
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              value={user.firstName ? user.firstName : ""}
              style={{ width: "35%" }}
              onChange={changeFirstname}
            />
            <Typography variant="body1" className={classes.infoText}>
              Lastname
            </Typography>
            <TextField
              variant="outlined"
              InputProps={{
                classes: {
                  input: classes.input,
                },
              }}
              value={user.lastName ? user.lastName : ""}
              style={{ width: "35%", marginLeft: 20 }}
              onChange={changeLastname}
            />
          </div>
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Phone
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            value={user.phoneNumber ? user.phoneNumber : ""}
            onChange={changePhone}
            inputProps={{
              maxLength: 12,
            }}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
          />
        </div>
      </Grid>
      <Grid item className={classes.gridItem}>
        <Typography variant="body1" className={classes.infoText}>
          Email
        </Typography>
        <div className={classes.gridItemInfo}>
          <TextField
            className={classes.textField}
            variant="outlined"
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            disabled
            value={user.email ? user.email : ""}
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
            onClick={updateProfile}
            disabled={!isValid || loading}
          >
            Update
            {loading ? (
              <CircularProgress size={20} className={classes.progress} />
            ) : null}
          </Button>
        </div>
      </Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Update profile successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateAccount;
