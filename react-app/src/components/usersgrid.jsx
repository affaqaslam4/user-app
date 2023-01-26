import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Checkbox } from "@mui/material";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "isAdmin",
    headerName: "Is Admin",
    renderCell: function (params) {
      return (
        <Checkbox
          checked={params.row.isAdmin}
          onChange={(e) => updateUserPermission(e, params.row)}
        />
      );
    },
    width: 90,
  },
];

const updateUserPermission = (event, data) => {
  axios
    .post("https://simple-user-app-affaq.herokuapp.com/api/setUserPermissions", {
      id: data._id,
      isAdmin: event.target.checked,
    })
    .then((res) => {})
    .catch((err) => console.log(err));
};

export const UsersGrid = () => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    axios
      .get("https://simple-user-app-affaq.herokuapp.com/api/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ height: 600, width: 600 }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={10}
        rowsPerPageOptions={[10, 20, 50, 100]}
      />
    </div>
  );
};
