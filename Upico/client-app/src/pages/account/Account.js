import { Grid, Tab, Tabs } from "@material-ui/core";

import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "../../components/Header";

import useStyles from "./styles/accountStyles";

import UpdateAccount from "./components/UpdateAccount";
import ChangePassword from "./components/ChangePassword";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Grid container className={classes.gridContainer}>
          {children}
        </Grid>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Account = () => {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.tabContainer}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
          TabIndicatorProps={{ style: { backgroundColor: "#3f51b5", left: 0 } }}
        >
          <Tab
            style={{ textTransform: "initial" }}
            label="Personal Information"
            {...a11yProps(0)}
          ></Tab>
          <Tab
            style={{ textTransform: "initial" }}
            label="Change Password"
            {...a11yProps(1)}
          ></Tab>
        </Tabs>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <UpdateAccount />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanel}>
          <ChangePassword />
        </TabPanel>
      </div>
    </div>
  );
};

export default Account;
