import PropTypes from "prop-types";
import * as Yup from "yup";
// @mui
import Box from "@mui/material/Box";
import { Button, Grid, Typography } from "@mui/material";
// components
import { SelectField } from "../inputs/SelectField";
import { optionsDocument, optionsGender } from "../../_mock/options";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputField } from "../inputs/InputField";
import { SelectFieldAsync } from "../inputs/SelectFieldAsync";
import { apiDepartments } from "../../_mock/optionsLocations/apiDepartments";
import { apiProvinces } from "../../_mock/optionsLocations/apiProvinces";
import { apiDistrict } from "../../_mock/optionsLocations/apiDistricts";
import { apiRols } from "../../_mock/optionsRols/apiRols";
import { postUser } from "../../helpers/UsersPage/ApiUsers";
import { deleteEmptyValues } from "../../utils/deleteEmptyValues";
import { toast } from "sonner";
import { DatePicker } from "@mui/x-date-pickers";

// ----------------------------------------------------------------------

const initialValues = {
  typeDocument: "Dni",
  gender: "",
};

export function Inscription({ handleCloseModal, infoUser }) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: Object.values(infoUser).length > 0 ? infoUser : initialValues,
    resolver: yupResolver(validationSchema),
  });

  const dataUser = watch();

  const onSubmit = (values) => {
    const { id, department, province, district, document, ...restValues } = values
    const updateData = {
      ...restValues,
      location: `${department}${province}${district}`,
      document: JSON.stringify(document)
    }
    const newData = deleteEmptyValues(updateData)
    
    if (Object.values(infoUser).length > 0) {
      console.log(id)
    } else {
      toast.success('El usuario se ha creado correctamente')
      // postUser(newData).then(res => {
      //   if (res.statusCode == 200) {
      //     toast.success('El usuario se ha creado correctamente')
      //     handleCloseModal();
      //   } else {
      //     toast.error('Ocurrió un error, vuelva a intentar más tarde')
      //   }
      // })
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

  const { isRolesLoading, optionsRoles } = apiRols()

  return (
    <Box sx={{ width: { sx: "100%", md: "50rem", lg: "60rem" } }}>
      <Typography variant="h5" style={{ marginBottom: "15px" }} gutterBottom>
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
            <InputField
              label="Fecha de nacimiento"
              name="birthDate"
              type='date'
              control={control}
              errors={errors}
            />
            <DatePicker />

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
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: { sx: "center", md: "end" },
                height: "45px",
              }}
            >
              <Button type="submit" variant="contained">
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
  names: Yup.string().required("Los nombres son obligatorios"),
  surnames: Yup.string().required("Los apellidos son obligatorios"),
  email: Yup.string().email("Ingrese un correo válido"),
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
};
