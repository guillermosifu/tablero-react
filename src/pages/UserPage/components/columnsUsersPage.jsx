import {
  Stack,
  Avatar,
  Typography,
  IconButton,
  Popover,
  MenuItem,
} from "@mui/material";
import Label from "../../../components/label";
import { sentenceCase } from "sentence-case";
import Iconify from "../../../components/iconify/Iconify";
import { useState } from "react";

export const columnsUserPage = ({ setInfoUser, handleOpenModal }) => {
  const [open, setOpen] = useState(null);

  const handleEdit = (info) => {
    const { location, password, created, state, verification, ...restInfo } = info;
    const updateInfo = {
      ...restInfo,
      department: location?.substring(0, 2),
      province: location?.substring(2, 4),
      district: location?.substring(4, 6)
    };
    setInfoUser(updateInfo);
    handleOpenModal();
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  const columns = [
    {
      name: "Name",
      cell: (row) => {
        return (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.names} src={row.photos} />
            <Typography variant="subtitle2" noWrap>
              {row.names}
            </Typography>
          </Stack>
        );
      },
      center: "true",
    },
    {
      name: "Company",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      center: "true",
    },
    {
      name: "Role",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      center: "true",
    },
    {
      name: "Verified",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      center: "true",
    },
    {
      name: "Status",
      cell: () => {
        return (
          <Label color={("status" === "banned" && "error") || "success"}>
            {sentenceCase("Active")}
          </Label>
        );
      },
      center: "true",
    },
    {
      name: "",
      cell: (row) => {
        return (
          <>
            <IconButton onClick={handleOpenMenu} size="large" color="inherit">
              <Iconify icon={"eva:more-vertical-fill"} />
            </IconButton>
            <Popover
              open={Boolean(open)}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  p: 1,
                  width: 140,
                  "& .MuiMenuItem-root": {
                    px: 1,
                    typography: "body2",
                    borderRadius: 0.75,
                  },
                },
              }}
            >
              <MenuItem onClick={() => handleEdit(row)}>
                <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                Edit
              </MenuItem>

              <MenuItem sx={{ color: "error.main" }}>
                <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
                Delete
              </MenuItem>
            </Popover>
          </>
        );
      },
      center: "true",
      width: "8rem",
    },
  ];
  return {
    columns,
  };
};
