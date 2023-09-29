import { Button, FormControlLabel, Switch } from "@mui/material";
import InputValidate from "./InputValidate";

export default function PricingSection (props) {
  const {errors, register, handlePricesTaxes, priceTaxes, productSelected, post, handlePost} = props
  return (
    <section className='flex'>
      <aside className='w-[35%]'>
        <h3 className="font-semibold text-gray-400">Precio</h3>
        <p className="text-sm">Insumos relacionados con el precio</p>
      </aside>
      <section className='w-[65%] flex flex-col'>
        <div className="w-full p-5 flex flex-col gap-4 shadow-md bg-white rounded-xl">
          <InputValidate type="number" simbol='$' name="regular_price" errors={errors} register={register} label="Precio Regular" />
          <InputValidate simbol='$' name="sale_price" errors={errors} register={register} label="Precio de Venta" />
          <FormControlLabel control={<Switch defaultChecked={priceTaxes} onChange={handlePricesTaxes} />} label="Precio incluye impuestos" />
          {!priceTaxes && (
            <InputValidate simbol='%' name="taxes" errors={errors} register={register} label="Impuesto (%)" />
          )}
        </div>
        <article className='py-4 pl-4 flex justify-between'>
          <FormControlLabel control={<Switch defaultChecked={productSelected?.post || post} onChange={handlePost} />} label="Publicar" {...register('post')} />
          <Button type='submit' className='bg-blue-700' variant="contained">{productSelected ? 'Actualizar' : 'Crear'}</Button>
        </article>
      </section>
    </section>
  )
}
