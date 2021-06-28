import React from "react";
import { List, Datagrid, TextField, DateField } from "react-admin";

const ReportList = (props) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="numOfReports" />
      <TextField source="firtsReporter" />
      <DateField source="firstReportTime" locales="fr-FR" showTime/>
    </Datagrid>
  </List>
);

export default ReportList;
