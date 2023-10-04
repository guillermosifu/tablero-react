import { InputField } from "@components/inputs/InputField";
import { TextareaAutosize } from "@mui/material";
import SelectFiels from "./SelectFiles";

export default function DetailsSection ({errors, control, register}) {
  return (
    <section className="flex">
      <aside className="w-[35%]">
        <h3 className="font-semibold text-gray-400">Detalles</h3>
        <p className="text-sm">Título, pequeña descripción, imagen...</p>
      </aside>
      <section className="w-[65%]">
        <div className="w-full p-5 shadow-md bg-white rounded-xl">
          <InputField
            placeholder='Nombre del Producto'
            name="product"
            control={control}
            errors={errors}
          />
          <div className='mt-4'>
            <TextareaAutosize
              color={`${errors.description && 'danger'}`}
              placeholder="Descripción"
              minRows={5}
              className={`w-full p-3 border rounded-md resize-none ${errors.description && 'border-red-500'}`}
              {...register('description')}
            />
            {errors.description && <p className="text-red-500 ml-2 text-[12px] -mt-2 font-semibold">{errors.description.message}</p>}
          </div>
          <div>
            <h6 className="mt-4 mb-2 text-sm font-semibold">Imágenes</h6>
            <SelectFiels />
          </div>
        </div>
      </section>
    </section>
  )
}
