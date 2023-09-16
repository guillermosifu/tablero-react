import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Stack,
  Avatar,
  Button,
  Popover,
  MenuItem,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
// components
import Label from "../components/label";
import Iconify from "../components/iconify";
// sections
import { UserListToolbar } from "../sections/@dashboard/user";
// mock
import USERLIST from '../_mock/user';
import { TransitionsModal } from '../components/modal/TransitionsModal';
import { TableBasic } from '../components/tables/TableBasic';
import { getUsers } from '../helpers/UsersPage/ApiUsers';
import Inscription from "../components/modal/Inscription";

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage() {
  const [dataUsers, setDataUsers] = useState([]);

  const [open, setOpen] = useState(null);

  const [order, setOrder] = useState("asc");

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res.statusCode == 200) {
        setDataUsers(res.data);
      }
    });
  }, []);

  const filteredUsers = applySortFilter(
    dataUsers,
    getComparator(order, orderBy),
    filterName
  );

  const { columns } = columnsUserPage({ handleOpenMenu })

  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            User
          </Typography>

          <Button
            onClick={handleOpenModal}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <TableBasic
            data={filteredUsers}
            columns={columns}
            highlightOnHover
          />
          <TransitionsModal isOpen={isOpen} onClose={handleCloseModal}>
            <Inscription/>
          </TransitionsModal>
        </Card>
      </Container>

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
        <MenuItem>
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
}

const columnsUserPage = ({ handleOpenMenu }) => {
  const columns = [
    {
      "name": "Name",
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
      "center": "true",
    },
    {
      "name": "Company",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      "center": "true",
    },
    {
      "name": "Role",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      "center": "true",
    },
    {
      "name": "Verified",
      cell: (row) => {
        return (
          <p className="text-gray-500 font-bold truncate text-start">
            {row?.names || "---"}
          </p>
        );
      },
      "center": "true",
    },
    {
      "name": "Status",
      cell: () => {
        return (
          <Label color={("status" === "banned" && "error") || "success"}>
            {sentenceCase("Active")}
          </Label>
        );
      },
      "center": "true",
    },
    {
      "name": "",
      cell: () => {
        return (
          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        )
      },
      "center": "true",
      "width": '8rem',
    },
  ];
  return {
    columns,
  };
};
