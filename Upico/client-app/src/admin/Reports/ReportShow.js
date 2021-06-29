import { Button, Grid } from "@material-ui/core";
import { ThumbDown, ThumbUp } from "@material-ui/icons";
import React from "react";
import {
  Show,
  TextField,
  DateField,
  Datagrid,
  TabbedShowLayout,
  Tab,
  ArrayField,
  useNotify,
  useRedirect,
  TopToolbar,
} from "react-admin";

import { AdminService } from "../../services/services";

import useStyles from "./showStyles";

const AcceptButton = ({ record }) => {
  const notify = useNotify();
  const redirect = useRedirect();
  console.log(record);

  const accept = () => {
    AdminService.approveReport(record.id).then((response) => {
      if (response.status === 200) {
        notify("Report Approved", "info");
        redirect("/reports");
      } else {
        notify("Error", "warning");
      }
    });
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={accept}
      style={{ marginRight: 10 }}
    >
      <ThumbUp
        color="primary"
        style={{ paddingRight: "0.5em", color: "green" }}
      />
      Accept
    </Button>
  );
};

const RejectButton = ({ record }) => {
  const notify = useNotify();
  const redirect = useRedirect();

  const reject = () => {
    AdminService.rejectReport(record.id).then((response) => {
      if (response.status === 200) {
        notify("Report Rejected", "info");
        redirect("/reports");
      } else {
        notify("Error", "warning");
      }
    });
  };

  return (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={reject}
      style={{ marginLeft: 10 }}
    >
      <ThumbDown
        color="primary"
        style={{ paddingRight: "0.5em", color: "red" }}
      />
      Reject
    </Button>
  );
};

const GridList = ({ record }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gallery} spacing={0}>
      {record.postImages && record.postImages.map((image, index) => (
        <Grid
          items
          xs={12}
          md={3}
          sm={4}
          lg={3}
          className={classes.galleryItem}
          key={index}
        >
          <div>
            <img
              alt="postImage"
              className={classes.galleryImage}
              src={image.url}
            />
          </div>
        </Grid>
      ))}
    </Grid>
  );
};

const ReportShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <AcceptButton record={data} />
    <RejectButton record={data} />
  </TopToolbar>
);

const ReportShow = (props) => {
  const classes = useStyles();
  return (
    <Show actions={<ReportShowActions />} {...props}>
      <TabbedShowLayout>
        <Tab label="Post Detail">
          <TextField label="Post ID" source="id" className={classes.post_id} />
          <TextField
            label="Content"
            source="content"
            className={classes.content}
          />
          <DateField
            label="Date Created"
            source="dateCreate"
            locales="fr-FR"
            showTime
            className={classes.date_created}
          />
          <GridList />
        </Tab>
        <Tab label="Reports Detail">
          <ArrayField source="reports" className={classes.table}>
            <Datagrid>
              <TextField label="Report Username" source="reporterUserName" />
              <TextField label="Report Reason" source="reportContent" />
              <DateField
                label="Report Time"
                source="dateCreated"
                locales="fr-FR"
                showTime
              />
            </Datagrid>
          </ArrayField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  );
};

export default ReportShow;
