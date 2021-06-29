import React, {
  useReducer,
  useContext,
  createContext,
  useEffect,
  useState,
} from "react";

import { PostService, UserService } from "../../../services/services";

const ProfileStateContext = createContext();
const ProfileDispatchContext = createContext();

const galleryReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return [];
    case "LOAD_MORE_POST":
      return state.concat(action.morePosts);
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.postId);
    default:
      return state;
  }
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return [];
    case "LOAD_MORE_POST":
      return state.concat(action.morePosts);
    case "ADD_COMMENT":
      return state.map((post) =>
        post.id === action.postId
          ? { ...post, comments: post.comments + 1 }
          : post
      );
    case "REMOVE_COMMENT":
      return state.map((post) =>
        post.id === action.postId
          ? { ...post, comments: post.comments - 1 }
          : post
      );
    case "REMOVE_POST":
      return state.filter((post) => post.id !== action.postId);
    default:
      return state;
  }
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return action.payload;
    case "FETCH_ERROR":
      return {};
    case "UPLOAD_AVATAR":
      return { ...state, avatarUrl: action.path };
    case "FOLLOW":
      return { ...state, isFollowed: true, followers: state.followers + 1 };
    case "UNFOLLOW":
      return { ...state, isFollowed: false, followers: state.followers - 1 };
    default:
      return state;
  }
};

const ProfileProvider = (props) => {
  const [gallery, galleryDispatch] = useReducer(galleryReducer, []);
  const [user, userDispatch] = useReducer(userReducer, {});
  const [posts, postsDispatch] = useReducer(postsReducer, []);

  const [targetUsername, setTargetUsername] = useState("");

  const sourceUsername = localStorage.getItem("username");

  useEffect(() => {
    if (targetUsername !== "") {
      PostService.getPostProfile(sourceUsername, targetUsername).then(
        (response) => {
          if (response.status === 200) {
            galleryDispatch({ type: "FETCH_SUCCESS", payload: response.data });
          } else {
            galleryDispatch({ type: "FETCH_ERROR" });
          }
        }
      );
      PostService.getPostProfile(sourceUsername, targetUsername, false).then(
        (response) => {
          if (response.status === 200) {
            postsDispatch({ type: "FETCH_SUCCESS", payload: response.data });
          } else {
            postsDispatch({ type: "FETCH_ERROR" });
          }
        }
      );
      UserService.getProfile(sourceUsername, targetUsername).then(
        (response) => {
          if (response.status === 200) {
            userDispatch({ type: "FETCH_SUCCESS", payload: response.data });
          } else {
            userDispatch({ type: "FETCH_ERROR" });
          }
        }
      );
    }
  }, [sourceUsername, targetUsername]);

  const providerValue = {
    user,
    gallery,
    posts,
    targetUsername,
    setTargetUsername,
  };

  return (
    <ProfileDispatchContext.Provider
      value={{ galleryDispatch, postsDispatch, userDispatch }}
    >
      <ProfileStateContext.Provider value={providerValue}>
        {props.children}
      </ProfileStateContext.Provider>
    </ProfileDispatchContext.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => useContext(ProfileStateContext);
export const useDispatchProfile = () => useContext(ProfileDispatchContext);
