import { Avatar, Stack, Typography } from "@mui/material";

export function ColumnsAttendance () {
  const columns = [{
    name: 'Nombres y Apellidos',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Avatar alt={row.name} src={row.photo} />
        <Typography variant="subtitle2" noWrap alignItems='center'>
          {row.name}
        </Typography>
      </Stack>
    )
  },{
    name: 'Hora',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="subtitle2" noWrap>
          {row.time}
        </Typography>
      </Stack>
    )
  }, {
    name: 'Fecha',
    cell: (row) => (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="subtitle2" noWrap>
          {row.date}
        </Typography>
      </Stack>
    )
  }]
  return {columns}
}
