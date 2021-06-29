import React, { useEffect, useRef } from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";

import { Person, Check } from "@material-ui/icons";

import useStyles from "./styles/userProfileStyles";
import { useLoading, useModal } from "../../../hooks/hooks";

import { useProfile, useDispatchProfile } from "../reducer/profileReducer";
import { AvatarService, UserService } from "../../../services/services";
import UnfollowModal from "./UnfollowModal";

const UserProfile = ({ targetUsername }) => {
  const classes = useStyles();

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  const { user, setTargetUsername } = useProfile();
  const { userDispatch } = useDispatchProfile();

  const { loading, onLoading, offLoading } = useLoading();
  const { isShowing, toggle } = useModal();

  const sourceUsername = localStorage.getItem("username");

  const handleClick = () => {
    toggle();
  };

  const selectAvatar = () => {
    fileInputRef.current.click();
  };

  const editAccount = () => {
    window.location.href = window.location.origin + "/accounts/edit";
  };

  const uploadAvatar = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    onLoading();
    AvatarService.uploadAvatar(sourceUsername, formData).then((response) => {
      if (response.status === 200) {
        const path = response.data.path;
        userDispatch({ type: "UPLOAD_AVATAR", path });
        offLoading();
      }
    });
  };

  const follow = () => {
    onLoading();
    UserService.follow(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        userDispatch({ type: "FOLLOW" });
        offLoading();
      }
    });
  };

  useEffect(() => {
    setTargetUsername(targetUsername);
  }, [targetUsername, setTargetUsername]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggle();
        document.body.style.overflow = "auto";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, toggle]);

  return (
    <div className={classes.root}>
      <UnfollowModal
        avatar={user.avatarUrl ? user.avatarUrl : null}
        isShowing={isShowing}
        modalRef={modalRef}
        toggleModal={toggle}
        sourceUsername={sourceUsername}
        targetUsername={user.userName ? user.userName : null}
      />
      {Object.keys(user).length > 0 && (
        <div className={classes.profile}>
          <div className={classes.content}>
            <div style={{ flexGrow: 3 }}>
              {sourceUsername !== targetUsername ? (
                <Avatar
                  src={user.avatarUrl ? user.avatarUrl : null}
                  className={classes.avatar}
                />
              ) : (
                <button className={classes.uploadButton} onClick={selectAvatar}>
                  <Avatar
                    src={user.avatarUrl ? user.avatarUrl : null}
                    className={classes.avatar}
                    loading={loading ? 1 : 0}
                  />
                  {loading ? (
                    <CircularProgress
                      size={24}
                      className={classes.avatarProgress}
                    />
                  ) : null}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={uploadAvatar}
                  />
                </button>
              )}
            </div>
            <div className={classes.info}>
              <div className={classes.infoPart}>
                <Typography variant="h5" className={classes.typo}>
                  {user.displayName}
                </Typography>
                {sourceUsername !== targetUsername ? (
                  user.isFollowed ? (
                    <div style={{ position: "relative" }}>
                      <Button
                        className={classes.button}
                        style={{
                          border: "1px solid #d9d9d9",
                          backgroundColor: "white",
                        }}
                        onClick={handleClick}
                        disabled={loading}
                      >
                        <Person className={classes.icon} />
                        <Check className={classes.icon} style={{ width: 15 }} />
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={20}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  ) : (
                    <div style={{ position: "relative" }}>
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        onClick={follow}
                      >
                        Follow
                      </Button>
                      {loading && (
                        <CircularProgress
                          size={20}
                          className={classes.buttonProgress}
                        />
                      )}
                    </div>
                  )
                ) : (
                  <Button
                    className={classes.button}
                    style={{
                      border: "1px solid #d9d9d9",
                      backgroundColor: "white",
                    }}
                    onClick={editAccount}
                  >
                    Edit profile
                  </Button>
                )}
              </div>
              <div className={classes.infoPart}>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.posts} </span>
                  {user.posts > 1 ? "posts" : "post"}
                </Typography>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.followers} </span>
                  {user.followers > 1 ? "followers" : "follower"}
                </Typography>
                <Typography variant="body1" className={classes.typo}>
                  <span style={{ fontWeight: "bold" }}>{user.followings} </span>
                  {user.following > 1 ? "followings" : "following"}
                </Typography>
              </div>
              <div
                className={classes.infoPart}
                style={{ flexDirection: "column", alignItems: "flex-start" }}
              >
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
                  {user.fullName ? user.fullName : user.userName}
                </Typography>
                <Typography variant="body1">
                  {user.bio ? user.bio : ""}
                </Typography>
              </div>
            </div>
          </div>
          <div className={classes.divider}></div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
