import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { Products } from "../context/ProductsContext";

export default function Header ({handleClick}) {
  const { productSelected } = useContext(Products)
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
    >
      <Stack
        direction={'column'}
        alignItems={'flex-start'}
      >
        <Typography variant="h4" gutterBottom>
          {productSelected ? 'Actualizar Producto' : 'Agregar Nuevo Producto'}
        </Typography>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          spacing={2}
        >
          <a onClick={handleClick} style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }}>
            Productos
          </a>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'gray' }}></span>
          <a onClick={handleClick} style={{ textDecoration: 'none', color: '#000000', cursor: 'pointer' }}>
            Lista
          </a>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'gray' }}></span>
          <a style={{ textDecoration: 'none', color: '#a0abb6' }}>
            Nuevo Producto
          </a>
        </Stack>
      </Stack>
    </Stack>
  )
}
