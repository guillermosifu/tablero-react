import { Container, Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { InputField } from "../../components/inputs/InputField";
import { useForm } from "react-hook-form";
import * as Yup from 'yup'

export default function Attendance () {

  const { control, formState: { errors }, handleSubmit, setValue } = useForm({
    defaultValues: {
      code: undefined
    }
  })

  const date = new Date()
  const minutos = date.getMinutes();
  const periodo = date.getHours() >= 12 ? 'PM' : 'AM';
  const horas12 = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const horaFormateada = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

  function sendData(data){
    console.log(data)
    setValue('code', undefined)
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
            alignItems={'flex-start'}
            spacing={2}
          >
            <span>Código del Alumno</span>
            <form onSubmit={handleSubmit(sendData)}>
              <InputField type='number' control={control} errors={errors} name={'code'}/>
              <button style={{ marginLeft: '10px' }}>Registrar</button>
            </form>
          </Stack>
        </Stack>
      </Container>
    </>
  )
}
