import React from "react";
import { TopBar } from "./topbar";
import { UsersGrid } from "./usersgrid";

export const Admin = () => {
  return (
    <div className="admin-page flex-column">
      <TopBar />
      <div className="grid">
        <UsersGrid />
      </div>
    </div>
  );
};
