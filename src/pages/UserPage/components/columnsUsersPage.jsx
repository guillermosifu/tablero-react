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
import Swal from "sweetalert2";
import { deleteUser } from "../../../helpers/UsersPage/ApiUsers";
import { toast } from "sonner";

export const columnsUserPage = ({ setInfoUser, handleOpenModal, handleRefresh }) => {
  const [open, setOpen] = useState(null);
  const [selectedRow, setSelectedRow] = useState({})
  const handle = (row) => {
    console.log(row);
  };

  const handleEdit = (info) => {
    const {
      location,
      password,
      created,
      state,
      verification,
      rol,
      ...restInfo
    } = info;
    const updateInfo = {
      ...restInfo,
      department: location?.substring(0, 2),
      province: location?.substring(2, 4),
      district: location?.substring(4, 6),
      rol: rol.id,
    };

    setInfoUser(updateInfo);
    handleOpenModal();
    handleCloseMenu();
  };

  const handleOpenMenu = (event, row) => {
    setOpen(event.currentTarget);
    setSelectedRow(row)
  };

  const handleCloseMenu = () => {
    setOpen(null);
    setSelectedRow({})
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
    },
    {
      name: "Mobile",
      cell: (row) => {
        return (
          <Typography variant="subtitle2" noWrap>
            {row?.mobile || "---"}
          </Typography>
        );
      },
      center: "true",
    },
    {
      name: "Role",
      cell: (row) => {
        return (
          <Typography variant="subtitle2" noWrap>
            {row?.rol?.name || "---"}
          </Typography>
        );
      },
      center: "true",
    },
    {
      name: "Local",
      cell: (row) => {
        return (
          <Typography variant="subtitle2" noWrap>
            {row?.local || "---"}
          </Typography>
        );
      },
      center: "true",
    },
    {
      name: "Status",
      cell: (row) => (
        <Label
          onClick={() => handle(row)}
          color={(row?.state === "I" && "error") || "success"}
        >
          {sentenceCase(row?.state == "A" ? "Active" : "Inactive")}
        </Label>
      ),
      center: "true",
    },
    {
      name: "",
      cell: (row) => (
        <>
          <IconButton onClick={(event) => handleOpenMenu(event, row)} size="large" color="inherit">
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
            <MenuItem onClick={() => handleEdit(selectedRow)}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={() => deleteAlert({ id:selectedRow.id, handleCloseMenu, handleRefresh })} sx={{ color: "error.main" }}>
              <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </>
      ),
      center: "true",
    }
  ];
  return {
    columns,
  };
};

const deleteAlert = ({ id, handleCloseMenu, handleRefresh }) => {
  console.log(id)
  handleCloseMenu()
  Swal.fire({
    title: '¿Estas seguro de eliminar este usuario?',
    text: "No podras revertir esta accion!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Si, eliminar!',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteUser(id).then((res) => {
        if (res.statusCode == 200) {
          toast.success('El usuario ha sido eliminado correctamente.')
          handleRefresh()
        } else {
          toast.error('Ha ocurrido un error, vuelva a intentar mas tarde.')
        }
      })
    }
  })
}