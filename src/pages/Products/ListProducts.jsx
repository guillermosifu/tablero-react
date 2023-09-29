import Iconify from "@components/iconify";
import { TableBasic } from "@components/tables/TableBasic";
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import ColumnsProducts from "./components/ColumnsProducts";
import { useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { Products as ProductsContext } from './context/ProductsContext'

export default function Products () {
  const { columns } = ColumnsProducts()
  const navigate = useNavigate()
  const handleClick = () => navigate("/dashboard/list/new", { replace: true, state: { logged: true } })
  const { products } = useContext(ProductsContext)
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Stack>
            <Typography variant="h4" gutterBottom>
              Lista
            </Typography>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              spacing={2}
            >
              <a onClick={() => navigate("/dashboard/list", { replace: true, state: { logged: true } })} style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }}>
                Productos
              </a>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'gray' }}></span>
              <a style={{ textDecoration: 'none', color: '#a0abb6' }}>
                Lista
              </a>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClick}
            className="bg-blue-600"
          >
            Nuevo Producto
          </Button>
        </Stack>
        <Card>
          <TableBasic
            data={products}
            columns={columns}
            highlightOnHover
          />
        </Card>
      </Container>
    </>
  )
}
