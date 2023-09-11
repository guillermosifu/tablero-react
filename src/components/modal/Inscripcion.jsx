import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';




export default function Inscripcion() {
  return (
    

    
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2, width: '35ch',  },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
      <Typography type="center" variant="h4" gutterBottom>
         Inscripciones
      </Typography>
      

        <TextField
          required
          id="outlined-required"
          label="Nombre"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Apellido"
          defaultValue=""
        />
      <TextField
          id="outlined-number"
          label="DNI"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Área"
          defaultValue=""
        />
        <TextField
          required
          id="outlined-required"
          label="Cargo"
          defaultValue=""
        />
        
      
        
        
      </div>

    </Box>
  );
}
