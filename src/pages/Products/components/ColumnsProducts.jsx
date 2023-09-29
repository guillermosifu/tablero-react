import Iconify from "@components/iconify"
import { Avatar, Stack, Typography, Chip, IconButton, Popover, MenuItem } from "@mui/material"
import { useContext, useState } from "react";
import { Products } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

export default function ColumnsProducts () {
  const [open, setOpen] = useState(null);
  const { setProductSelected } = useContext(Products)
  const navigate = useNavigate ()

  function handleClick (event, row) {
    setOpen(event.currentTarget)
    setProductSelected(row)
  }

  function handleCloseMenu () {
    setOpen(null);
    setProductSelected(null)
  }

  const columns = [{
    name: 'Producto',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar sizes="lg" variant="rounded" color="primary" alt={row.product} src={row.product.length === 0 ? null : ''} />
        <Stack>
          <div style={{ width: '100px' }}>
            <Typography variant="subtitle2" alignItems='center'>
              {row.product}
            </Typography>
            <span style={{ fontSize: '12px', color: 'gray' }}>
              {row.category}
            </span>
          </div>
        </Stack>
      </Stack>
    )
  }, {
    name: 'F. Creación',
    cell: (row) => (
      <Stack direction="column" alignItems="flex-start" spacing={0}>
        <Typography variant="subtitle1">
          {row.date_created}
        </Typography>
        <span style={{ fontSize: '12px', color: 'gray' }}>
          {row.time_created}
        </span>
      </Stack>
    )
  }, {
    name: 'Stock',
    cell: (row) => {
      let stock
      let message
      if (row.quantity == 0) stock = 'red', message = 'Sin stock'
      else if (row.quantity > 0 && row.stock < 20) stock = 'orange', message = 'bajo stock'
      else if (row.quantity >= 20) stock = 'green', message = 'stock'
      
      return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography color={stock} variant="subtitle2" alignItems="center">
          {row.quantity} {message}
        </Typography>
      </Stack>
    )}
  }, {
    name: 'Precio',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="subtitle2">
          ${row.regular_price}
        </Typography>
      </Stack>
    )
  }, {
    name: 'Publicado',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Chip color={`${row.post ? 'success' : 'error'}`} label={`${row.post ? 'publicado' : 'no publicado'}`} size="sm" variant="soft" />
      </Stack>
    )
  }, {
    name: '',
    cell: (row) => {
      return (
        <>
          <IconButton onClick={(event) => handleClick(event, row)} size="large" color="inherit">
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
            <MenuItem onClick={()=>navigate("/dashboard/list/new", { replace: true, state: { logged: true } })}>
              <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
              Editar
            </MenuItem>
          </Popover>
        </>
      )
    }
  }]
  return { columns }
}
