import { InputField } from "@components/inputs/InputField";
import { Checkbox, FormControl, FormControlLabel, InputLabel, Select, Switch, TextField } from "@mui/material";
import MultipleSelect from "./MultiSelect";
import TagsSelect from "./TagsSelect";

export default function PropertiesSection ({control, errors, register, dataColors, dataTalla, productSelected, saleLabelSwitch, newLabelSwitch, handleChangeNewLabel, handleChangeSaleLabel}) {
  return (
    <section className='flex'>
      <aside className='w-[35%]'>
        <h3 className="font-semibold text-gray-400">Propiedades</h3>
        <p className="text-sm">Funciones adicionales y atributos...</p>
      </aside>
      <section className="w-[65%]">
        <div className="w-full p-5 flex flex-col gap-4 shadow-md bg-white rounded-xl">
          <article className='grid grid-cols-2 gap-4'>
            <InputField
              placeholder='Código del Producto'
              name="product_code"
              control={control}
              errors={errors}
            />
            <InputField
              placeholder='Producto SKU'
              name="product_sku"
              control={control}
              errors={errors}
            />
            <InputField
              placeholder='Cantidad'
              type="number"
              name="quantity"
              control={control}
              errors={errors}
            />
            <FormControl>
              <InputLabel htmlFor="grouped-native-select">Categoria</InputLabel>
              <Select native defaultValue="1" id="grouped-native-select" label="Category" {...register('category')}>
                <optgroup label="Ropa">
                  <option value={'shirts'}>Camisas</option>
                  <option value={'t-shirts'}>Camisetas</option>
                  <option value={'jeans'}>Jeans</option>
                  <option value={'leather'}>Cuero</option>
                  <option value={'accesories'}>Accesorios</option>
                </optgroup>
                <optgroup label="A Medida">
                  <option value={'suits'}>Trajes</option>
                  <option value={'blazers'}>Chaquetas</option>
                  <option value={'trousers'}>Pantalones</option>
                  <option value={'waistcoats'}>Chalecos</option>
                  <option value={'apparel'}>Vestimenta</option>
                </optgroup>
                <optgroup label="Accesorios">
                  <option value='shose'>Zapatos</option>
                  <option value='backpack and bug'>Mochilas y Bolsos</option>
                  <option value='colects'>Pulseras</option>
                  <option value='face mask'>Mascarillas</option>
                </optgroup>
              </Select>
              {errors.category && <p className="text-red-500 ml-2 text-[12px] -mt-2 font-semibold">{errors.category?.message}</p>}
            </FormControl>
            <MultipleSelect register={register} name="colors" label="Colores" data={dataColors} />
            <MultipleSelect register={register} name="size" label="Tallas" data={dataTalla} />
          </article>
          <TagsSelect />
          <article>
            <h6 className="mt-4 mb-2 text-sm font-semibold">Género</h6>
            <FormControlLabel control={<Checkbox defaultChecked={productSelected?.men} {...register('men')} />} label="Hombres" />
            <FormControlLabel control={<Checkbox defaultChecked={productSelected?.women} {...register('women')} />} label="Mujeres" />
            <FormControlLabel control={<Checkbox defaultChecked={productSelected?.kids} {...register('kids')} />} label="Niños" />
          </article>
          <div className='w-full flex items-center gap-4'>
            <Switch defaultChecked={saleLabelSwitch} onChange={handleChangeSaleLabel} />
            <TextField {...register('sale_label')} disabled={!saleLabelSwitch} className='w-5/6' id="outlined-basic" label="Venta de Etiquetas" variant="outlined" />
          </div>
          <div className='w-full flex items-center gap-4'>
            <Switch defaultChecked={newLabelSwitch} onChange={handleChangeNewLabel} />
            <TextField {...register('new_label')} disabled={!newLabelSwitch} className='w-5/6' id="outlined-basic" label="Venta de Etiquetas" variant="outlined" />
          </div>
        </div>
      </section>
    </section>
  )
}
