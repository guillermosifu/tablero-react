import { Card, Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { InputField } from "../../components/inputs/InputField";
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from 'yup'
import { TableBasic } from "../../components/tables/TableBasic";
import { ColumnsAttendance } from "./components/ColumnsAttendance";
import useGetData from "./hook/useGetData";

export default function Attendance () {

  const { control, formState: { errors }, handleSubmit, setValue } = useForm({
    defaultValues: '',
    resolver: yupResolver(schema)
  })
  const { data } = useGetData()
  const { columns } = ColumnsAttendance()
  const date = new Date()
  const minutos = date.getMinutes();
  const periodo = date.getHours() >= 12 ? 'PM' : 'AM';
  const horas12 = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const horaFormateada = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

  function sendData (data) {
    console.log(data)
    setValue('code', '')
  }
  return (
    <>
      <Helmet>
        <title>Attendance</title>
      </Helmet>
      <Container>
        <Stack
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          spacing={2}
        >
          <Typography variant="h4" gutterBottom>
            Asistencia
          </Typography>
          <ul style={{ listStyle: 'none' }}>
            <li>Fecha: {date.getDate()} de {date.toLocaleString('default', { month: 'long' })} de {date.getFullYear()}</li>
            <li>Hora: {horaFormateada}</li>
          </ul>
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={2}
          >
            <Typography style={{ marginBottom: '15px' }}>Código del Alumno</Typography>
            <form style={{ display: 'flex', gap: '5px' }} onSubmit={handleSubmit(sendData)}>
              <InputField type='number' name='code' control={control} errors={errors} />
              <Button style={{ height: '55px' }} type="submit" variant="contained">Registrar</Button>
            </form>
          </Stack>
        </Stack>
        <Card>
          <TableBasic
            data={data}
            columns={columns}
            highlightOnHover
          />
        </Card>
      </Container>
    </>
  )
}

const schema = Yup.object().shape({
  code: Yup.string()
    .required('El cédula es obligatoria')
    .min(3, 'Debe tener al menos 3 dígitos')
})