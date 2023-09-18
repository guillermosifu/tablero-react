import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
// components
import Iconify from "../../components/iconify";
// sections
import { UserListToolbar } from "../../sections/@dashboard/user";
// mock
import { TransitionsModal } from "../../components/modal/TransitionsModal";
import { TableBasic } from "../../components/tables/TableBasic";
import { getUsers } from "../../helpers/UsersPage/ApiUsers";
import { Inscription } from "./components/Inscription";
import { columnsUserPage } from "./components/columnsUsersPage";
// sonner
import { Toaster } from "sonner";

// ----------------------------------------------------------------------

export function UserPage() {
  const [infoUser, setInfoUser] = useState({});
  const [dataUsers, setDataUsers] = useState([]);
  const [userIsLoaded, setUserIsLoaded] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => {
    setInfoUser({});
    setIsOpen(false);
  };

  const handleRefresh = () => setRefreshData(!refreshData);

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  useEffect(() => {
    getUsers().then((res) => {
      if (res.statusCode == 200) {
        setDataUsers(res.data);
      }
      setUserIsLoaded(true);
    });
  }, [refreshData]);

  const { columns } = columnsUserPage({
    setInfoUser,
    handleOpenModal,
    handleRefresh,
  });

  return (
    <>
      <Toaster richColors position="top-right" />
      <Helmet>
        <title> Usuarios </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>

          <Button
            disabled={!userIsLoaded}
            onClick={handleOpenModal}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Nuevo Usuario
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          {userIsLoaded ? (
            <TableBasic data={dataUsers} columns={columns} highlightOnHover />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
              <CircularProgress position='center' color="inherit" size={35} />
            </Box>
          )}
          <TransitionsModal isOpen={isOpen} onClose={handleCloseModal}>
            <Inscription
              handleCloseModal={handleCloseModal}
              handleRefresh={handleRefresh}
              infoUser={infoUser}
            />
          </TransitionsModal>
        </Card>
      </Container>
    </>
  );
}
