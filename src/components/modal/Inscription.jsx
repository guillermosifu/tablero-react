import Box from '@mui/material/Box';
import { Grid, TextField, Typography } from '@mui/material';


export default function Inscription() {
  return (
    <Box md={{ width: '40rem' }}>
      <Typography variant="h5" style={{ marginBottom: '15px' }} gutterBottom>
        Nuevo Usuario
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Apellido"
            defaultValue=""
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Dirección"
            defaultValue=""
          />
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="'Documento'"
            defaultValue=""
          />
            <TextField
            fullWidth
            required
            id="outlined-required"
            label="'local'"
            defaultValue=""
          />
            <TextField
            fullWidth
            required
            id="outlined-required"
            label="'Telefono'"
            defaultValue=""
          />

        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Tipo de documento"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="outlined-required"
            label="Locación"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="outlined-required"
            label="Genero"
            defaultValue=""
          />
        </Grid>
        
      </Grid>
    </Box>
  );
}
