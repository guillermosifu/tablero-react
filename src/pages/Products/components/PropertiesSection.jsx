import { InputField } from "@components/inputs/InputField";
import { FormControl, InputLabel, Select } from "@mui/material";
import TagsSelect from "./TagsSelect";

export default function PropertiesSection ({control, errors, register}) {
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
          </article>
          <TagsSelect />
        </div>
      </section>
    </section>
  )
}
