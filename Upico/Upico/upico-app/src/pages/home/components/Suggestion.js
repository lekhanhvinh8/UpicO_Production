import { Avatar, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { FavoriteBorder, Favorite } from "@material-ui/icons";

import useStyles from "./styles/suggestionStyles";

import { UserService } from "../../../services/services";

const SuggestionOption = ({ suggest }) => {
  const classes = useStyles();
  const [isFollowed, setIsFollowed] = useState(false);

  const sourceUsername = localStorage.getItem("username");

  const follow = (e, targetUsername) => {
    UserService.follow(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setIsFollowed(true);
      }
    });
  };

  const unfollow = (e, targetUsername) => {
    UserService.unfollow(sourceUsername, targetUsername).then((response) => {
      if (response.status === 200) {
        setIsFollowed(false);
      }
    });
  };

  return (
    <div className={classes.suggest}>
      <Avatar
        alt="avatar"
        src={suggest.avatarUrl ? suggest.avatarUrl : null}
        className={classes.avatar}
        onClick={() => {
          window.location.href =
            window.location.origin + "/" + suggest.userName;
        }}
      />
      <div className={classes.info}>
        <Typography
          className={classes.name}
          onClick={() => {
            window.location.href =
              window.location.origin + "/" + suggest.userName;
          }}
        >
          {suggest.displayName ? suggest.displayName : suggest.userName}
        </Typography>
        <Typography className={classes.desc}>{suggest.bio}</Typography>
      </div>
      {isFollowed ? (
        <Favorite
          className={classes.icon}
          onClick={(e) => unfollow(e, suggest.userName)}
          username={suggest.userName}
        />
      ) : (
        <FavoriteBorder
          className={classes.icon}
          onClick={(e) => follow(e, suggest.userName)}
          username={suggest.userName}
        />
      )}
    </div>
  );
};

const Suggestion = ({ suggests }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <div className={classes.header}>
        <Typography className={classes.headerText}>
          Suggestions for you
        </Typography>
      </div>
      <div className={classes.container}>
        {suggests.length > 0 &&
          suggests.map((suggest, index) => {
            return <SuggestionOption suggest={suggest} key={index} />;
          })}
      </div>
    </Paper>
  );
};

export default Suggestion;
