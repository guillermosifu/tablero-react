import * as Yup from "yup";
import PropTypes from "prop-types";
// @mui
import Box from "@mui/material/Box";
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
// components
import { SelectField } from "../../../components/inputs/SelectField";
import { optionsDocument, optionsGender } from "../../../_mock/options";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../../../components/inputs/InputField";
import { SelectFieldAsync } from "../../../components/inputs/SelectFieldAsync";
import { apiDepartments } from "../../../_mock/optionsLocations/apiDepartments";
import { apiProvinces } from "../../../_mock/optionsLocations/apiProvinces";
import { apiDistrict } from "../../../_mock/optionsLocations/apiDistricts";
import { apiRols } from "../../../_mock/optionsRols/apiRols";
import { postUser, putUser } from "../../../helpers/UsersPage/ApiUsers";
import { deleteEmptyValues } from "../../../utils/deleteEmptyValues";
import { toast } from "sonner";
import { DateField } from "../../../components/inputs/DateField";
import Iconify from "../../../components/iconify/Iconify";
import { useState } from "react";

// ----------------------------------------------------------------------

const initialValues = {
  typeDocument: "Dni",
  gender: "",
};

export function Inscription({ handleCloseModal, handleRefresh, infoUser }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues:
      Object.values(infoUser).length > 0 ? infoUser : initialValues,
    resolver: yupResolver(validationSchema),
  });

  const dataUser = watch();

  const onSubmit = (values) => {
    setIsSubmiting(true);
    const {
      id,
      department,
      province,
      district,
      document,
      mobile,
      rol,
      ...restValues
    } = values;
    const updateData = {
      ...restValues,
      location: `${department}${province}${district}`,
      document: JSON.stringify(document),
      mobile: String(mobile),
      rol: Number(rol),
    };
    const newData = deleteEmptyValues(updateData);

    if (Object.values(infoUser).length > 0) {
      putUser(newData, id).then((res) => {
        if (res.statusCode == 200) {
          toast.success("El usuario se ha actualizado correctamente");
          handleCloseModal();
          handleRefresh();
        } else {
          toast.error("Ocurrió un error, vuelva a intentar más tarde");
        }
        setIsSubmiting(false);
      });
    } else {
      postUser(newData).then((res) => {
        if (res.statusCode == 200) {
          toast.success("El usuario se ha creado correctamente");
          handleCloseModal();
          handleRefresh();
        } else {
          toast.error("Ocurrió un error, vuelva a intentar más tarde");
        }
        setIsSubmiting(false);
      });
    }
  };

  const { isDepartmentsLoaded, optionsDepartments } = apiDepartments();

  const { isProvincesLoaded, optionsProvinces } = apiProvinces({
    idDepartment: dataUser.department,
  });

  const { isDistrictLoaded, optionsDistricts } = apiDistrict({
    idDepartment: dataUser.department,
    idProvince: dataUser.province,
  });

  const { isRolesLoading, optionsRoles } = apiRols();

  return (
    <Box sx={{ width: { sx: "100%", md: "50rem", lg: "60rem" } }}>
      <Typography variant="h5" style={{ marginBottom: "30px" }} gutterBottom>
        Nuevo Usuario
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1} columnSpacing={2}>
          <Grid item xs={12} md={1.5}>
            <SelectField
              name="typeDocument"
              label="Tipo de Documento"
              options={optionsDocument}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={2.5}>
            <InputField
              label="Documento"
              name="document"
              type="number"
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputField
              label="Nombre"
              name="names"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <InputField
              label="Apellidos"
              name="surnames"
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SelectField
              label="Genero"
              name="gender"
              options={optionsGender}
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputField
              label="Teléfono"
              name="mobile"
              type="number"
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <InputField
              label="Local"
              name="local"
              control={control}
              errors={errors}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SelectFieldAsync
              label="Departamento"
              name="department"
              loading={isDepartmentsLoaded}
              options={optionsDepartments}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectFieldAsync
              label="Provincia"
              name="province"
              loading={isProvincesLoaded}
              options={optionsProvinces}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SelectFieldAsync
              label="Distrito"
              name="district"
              loading={isDistrictLoaded}
              options={optionsDistricts}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <InputField
              label="Dirección"
              name="address"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <DateField
              label="Fecha de nacimiento"
              name="birthDate"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectFieldAsync
              label="Rol"
              name="rol"
              loading={isRolesLoading}
              options={optionsRoles}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <InputField
              label="Area"
              name="area"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
            <InputField
              label="Correo"
              name="email"
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={4}>
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
                        icon={
                          showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              control={control}
              errors={errors}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { sx: "center", md: "end" },
                height: "45px",
              }}
            >
              <Button disabled={isSubmiting} type="submit" variant="contained">
                Guardar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

const validationSchema = Yup.object().shape({
  document: Yup.number()
    .required("El documento es Obligatorio")
    .max(99999999, "Máximo 8 Caracteres"),
  area: Yup.string().required("El area es obligatoria"),
  names: Yup.string().required("Los nombres son obligatorios"),
  surnames: Yup.string().required("Los apellidos son obligatorios"),
  birthDate: Yup.string().required("La fecha es obligatoria"),
  rol: Yup.string().required("El rol es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  email: Yup.string()
    .email("Ingrese un correo válido")
    .required("El correo es obligatorio"),
  mobile: Yup.string()
    .matches(/^[9]/, "El teléfono debe comenzar con 9")
    .min(9, "El teléfono debe tener al menos 9 dígitos")
    .required("El numero es obligatorio"),
  address: Yup.string().required("La dirección es obligatoria"),
  gender: Yup.string().required("El género es obligatorio"),
  local: Yup.string().required("El local es obligatorio"),
  department: Yup.string().required("El departamento es obligatorio"),
  province: Yup.string().required("La provincia es obligatoria"),
  district: Yup.string().required("El distrito es obligatorio"),
});

Inscription.propTypes = {
  handleCloseModal: PropTypes.func.isRequired,
  infoUser: PropTypes.object,
  handleRefresh: PropTypes.func,
};
