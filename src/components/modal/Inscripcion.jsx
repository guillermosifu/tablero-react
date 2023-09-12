import Box from '@mui/material/Box';
import { Grid, TextField, Typography } from '@mui/material';

export default function Inscripcion() {
  return (
    <Box md={{ width: '40rem' }}>
      <Typography variant="h5" style={ {marginBottom: '15px'} } gutterBottom>
        Nuevo Usuario
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
          fullWidth
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />  
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />  
        </Grid>
        <Grid item xs={12} sm={8}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />  
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />  
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            defaultValue=""
          />  
        </Grid>
      </Grid>
    </Box>
  );
}
