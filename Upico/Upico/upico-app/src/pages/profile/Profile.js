import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";

import useStyles from "./styles/profileStyles";

import UserProfile from "./components/UserProfile";
import GalleryProfile from "./components/GalleryProfile";
import { Tab, Tabs } from "@material-ui/core";
import PostProfile from "./components/PostProfile";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
};

const Profile = ({ match }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header />
      <UserProfile targetUsername={match.params.username} />
      <div style={{ maxWidth: "60%", margin: "0 auto" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          TabIndicatorProps={{ style: { backgroundColor: "#3f51b5", top: 0 } }}
        >
          <Tab label="Gallery" {...a11yProps(0)} />
          <Tab label="Post" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <GalleryProfile />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostProfile />
        </TabPanel>
      </div>
    </div>
  );
};

export default Profile;
