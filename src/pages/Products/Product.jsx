import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import '../../../node_modules/react-quill/dist/quill.snow.css'
import { Products } from './context/ProductsContext';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import DetailsSection from './components/DetailsSection';
import PropertiesSection from './components/PropertiesSection';
import PricingSection from './components/PricingSection';
import { dataColors } from './const/dataColors'
import { dataTalla } from './const/dataTalla'

export default function Product () {
  const { addProduct, productSelected, setProductSelected, editProduct } = useContext(Products)
  const [saleLabelSwitch, setSaleLabelSwitch] = useState(false)
  const [newLabelSwitch, setNewLabelSwitch] = useState(false)
  const [priceTaxes, setPriceTaxes] = useState(false)
  const [post, setPost] = useState(false)
  const navigate = useNavigate()
  const { control, formState: { errors }, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      product: productSelected?.product,
      description: productSelected?.description,
      emailContent: productSelected?.emailContent,
      product_code: productSelected?.product_code,
      product_sku: productSelected?.product_sku,
      quantity: productSelected?.quantity,
      regular_price: productSelected?.regular_price,
      sale_price: productSelected?.sale_price,
      taxes: productSelected?.taxes,
      category: productSelected?.category,
      images: productSelected?.images,
      colors: productSelected?.colors,
      size: productSelected?.size,
      men: productSelected?.men,
      women: productSelected?.women,
      kids: productSelected?.kids,
      sale_label: productSelected?.sale_label,
      new_label: productSelected?.new_label,
      post: productSelected?.post,
    },
    resolver: yupResolver(schema)
  })

  const date = new Date()
  const minutos = date.getMinutes();
  const periodo = date.getHours() >= 12 ? 'PM' : 'AM';
  const horas12 = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const timeFormated = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

  useEffect(() => {
    register("emailContent", { required: true, minLength: 11 });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("emailContent", editorState);
  };

  const editorContent = watch("emailContent");

  function handleClick () {
    setProductSelected(null)
    navigate("/dashboard/list", { replace: true, state: { logged: true } })
  }

  function handleSubmitForm (data) {
    const result = {
      ...data,
      date_created: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
      time_created: timeFormated,
    }
    if (productSelected) {
      editProduct(data)
    } else {
      addProduct(result)
    }
    setProductSelected(null)
    navigate("/dashboard/list", { replace: true, state: { logged: true } })
  }

  const handleChangeSaleLabel = (e) => setSaleLabelSwitch(e.target.checked)
  const handleChangeNewLabel = (e) => setNewLabelSwitch(e.target.checked)
  const handlePricesTaxes = (e) => setPriceTaxes(e.target.checked)
  const handlePost = (e) => setPost(e.target.checked)

  return (
    <>
      <Helmet>
        <title>New Product</title>
      </Helmet>
      <Container>
        <Header handleClick={handleClick} />
        <main className="flex flex-col gap-10">
          <form className='flex flex-col gap-8' onSubmit={handleSubmit(handleSubmitForm)}>
            <DetailsSection errors={errors} control={control} register={register} editorContent={editorContent} onEditorStateChange={onEditorStateChange}/>
            <PropertiesSection 
              errors={errors}
              control={control}
              register={register}
              dataColors={dataColors}
              dataTalla={dataTalla}
              productSelected={productSelected}
              saleLabelSwitch={saleLabelSwitch}
              newLabelSwitch={newLabelSwitch}
              handleChangeNewLabel={handleChangeNewLabel}
              handleChangeSaleLabel={handleChangeSaleLabel}              
            />
            <PricingSection
              errors={errors}
              register={register}
              handlePricesTaxes={handlePricesTaxes}
              priceTaxes={priceTaxes}
              productSelected={productSelected}
              post={post}
              handlePost={handlePost}            
            />
          </form>
        </main>
      </Container>
    </>
  )
}

const schema = Yup.object().shape({
  product: Yup.string().required('El nombre es requerido'),
  description: Yup.string().required('La descripción es requerida'),
  emailContent: Yup.string().required('El contenido es requerido'),
  product_code: Yup.string().required('Este campo es requerido'),
  product_sku: Yup.string().required('Este campo es requerido'),
  quantity: Yup.number().required('La cantidad es requerida'),
  regular_price: Yup.string().required('El precio regular es requerido'),
  sale_price: Yup.string().required('El precio regular es requerido'),
  taxes: Yup.string(),
  category: Yup.string().required('El precio regular es requerido'),
  images: Yup.array().min(1, 'Selecciona al menos una imagen'),
  colors: Yup.array().min(1, 'Selecciona al menos un color'),
  size: Yup.array().min(1, 'Selecciona al menos una talla'),
  men: Yup.boolean(),
  women: Yup.boolean(),
  kids: Yup.boolean(),
  sale_label: Yup.string(),
  new_label: Yup.string(),
  post: Yup.boolean(),
  // colors: Yup.required('Elige un color'),
})