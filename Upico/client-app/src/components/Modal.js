import { Avatar, Paper, TextField, Typography } from "@material-ui/core";

import { AddAPhoto, MoreHoriz, Send } from "@material-ui/icons";

import Photogrid from "./PhotoGrid";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import useStyles from "./styles/modalStyles";
import { useLoading } from "../hooks/hooks";

import PostService from "../services/post.services";
import FullscreenLoading from "./FullscreenLoading";

const Modal = ({
  isShowing,
  hide,
  propRef,
  displayName,
  avatar,
  fileInput,
  files,
  handleFileChange,
  setPosts,
  setFiles,
}) => {
  const classes = useStyles();
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleClick = (e) => {
    fileInput.current.click();
  };

  const { loading, onLoading, offLoading } = useLoading();

  isShowing
    ? (document.body.style.overflow = "hidden")
    : (document.body.style.overflow = "auto");

  useEffect(() => {
    if (files) {
      setData([]);
      for (let i = 0; i < files.length; i++) {
        setData((prevData) => [...prevData, URL.createObjectURL(files[i])]);
      }
    } else {
      setData([]);
    }
  }, [files]);

  const createPost = () => {
    onLoading();
    const username = localStorage.getItem("username");
    if (content.length > 0) {
      PostService.createPost(username, content).then((response) => {
        if (response.status === 200) {
          let post = response.data;
          if (files) {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append(`postImage[${i}]`, files[i], files[i].name);
            }

            PostService.uploadImage(post.id, formData).then((response) => {
              if (response.status === 200) {
                post.postImages = response.data;
                setPosts((prevPosts) => {
                  return [post, ...prevPosts];
                });
                offLoading();
              }
            });
          } else {
            offLoading();
            setPosts((prevPosts) => {
              return [response.data, ...prevPosts];
            });
          }
        }
      });
      setContent("");
      setFiles(null);
      hide();
    }
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div style={{ position: "relative" }}>
          <div className={classes.modalOverflay}></div>
          <Paper className={classes.root} ref={propRef}>
            <div className={classes.header}>
              <div className={classes.avatarContainer}>
                <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                <Typography className={classes.name}>{displayName}</Typography>
              </div>
              <MoreHoriz className={classes.icon} />
            </div>
            <div style={{ padding: 10 }}>
              <TextField
                className={classes.textField}
                placeholder="What's on your mind ?"
                multiline
                rows={4}
                rowsMax={4}
                onChange={handleChange}
              ></TextField>
            </div>
            <div style={{ padding: "0 10px" }}>
              {data.length > 0 && (
                <Photogrid images={data} setData={setData} setFiles={setFiles} maxWidth={540}></Photogrid>
              )}
            </div>
            <div className={classes.action}>
              <div className={classes.button} onClick={handleClick}>
                <AddAPhoto className={classes.icon} />
              </div>
              <input
                type="file"
                hidden
                ref={fileInput}
                onChange={handleFileChange}
                accept="image/*"
                multiple
              />
              <div className={classes.button} onClick={createPost}>
                <Send className={classes.icon} />
              </div>
            </div>
          </Paper>
        </div>,
        document.body
      )
    : loading
    ? ReactDOM.createPortal(<FullscreenLoading />, document.body)
    : null;
};

export default Modal;
