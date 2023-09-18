import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
// hook form
import { InputField } from "../../../components/inputs/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postLogin } from "../../../helpers/ApiUsers";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {
    // postLogin(values).then(res => {
    //   if (res.statusCode == 200) {
    //     console.log(res)
    //   }
    // })
    navigate("/dashboard/user", { replace: true, state: { logged: true } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <InputField
          label="Correo"
          name="email"
          control={control}
          errors={errors}
          type="email"
        />
        <InputField
          label="Contraseña"
          name="password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          control={control}
          errors={errors}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained">
        Iniciar sesión
      </LoadingButton>
    </form>
  );
}

const validationSchema = Yup.object().shape({
  password: Yup.string().required("La contraseña es obligatoria"),
  email: Yup.string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
});
