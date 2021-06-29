import React from "react";
import { Admin, Resource } from "react-admin";
import LoginPage from "./LoginPage";

import authProvider from "./authProvider";
import dataProvider from "./dataProvider";
import reports from "./Reports/index";

export default function AdminApp() {
  return (
    <Admin
      loginPage={LoginPage}
      authProvider={authProvider}
      dataProvider={dataProvider}
    >
      <Resource name="reports" {...reports} />
    </Admin>
  );
}
