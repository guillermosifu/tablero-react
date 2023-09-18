import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import { Card, Stack, Button, Container, Typography } from "@mui/material";
// components
import Iconify from "../../components/iconify";
// sections
import { UserListToolbar } from "../../sections/@dashboard/user";
// mock
import { TransitionsModal } from "../../components/modal/TransitionsModal";
import { TableBasic } from "../../components/tables/TableBasic";
import { getUsers } from "../../helpers/UsersPage/ApiUsers";
import { Inscription } from "../../components/modal/Inscription";
import { columnsUserPage } from "./components/columnsUsersPage";
import { Toaster } from "sonner";

// ----------------------------------------------------------------------

export function UserPage() {
  const [infoUser, setInfoUser] = useState({});
  const [dataUsers, setDataUsers] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setInfoUser({});
    setIsOpen(false);
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

  const { columns } = columnsUserPage({ setInfoUser, handleOpenModal });

  return (
    <>
      <Toaster richColors position="top-right" />
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
          <TableBasic data={dataUsers} columns={columns} highlightOnHover />
          <TransitionsModal isOpen={isOpen} onClose={handleCloseModal}>
            <Inscription
              handleCloseModal={handleCloseModal}
              infoUser={infoUser}
            />
          </TransitionsModal>
        </Card>
      </Container>
    </>
  );
}
