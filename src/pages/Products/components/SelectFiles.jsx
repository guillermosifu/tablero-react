import { Button } from '@mui/material';
import { useRef, useState } from 'react';

export default function SelectFiels () {
  const [selectedImages, setSelectedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    const selected = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        selected.push(URL.createObjectURL(file));
      }
    }

    setSelectedImages(selected);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageDelete = (id) => {
    const updatedImages = selectedImages.filter((image, index) => index !== id);
    setSelectedImages(updatedImages);
  };

  return (
    <section className='flex flex-col gap-4'>
      <input ref={fileInputRef} className='hidden' accept='image/*' type="file" id="fileInput" multiple onChange={handleFileChange} />
      <section>
        <div
          onClick={handleImageUploadClick}
          style={{
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
          }}
        >
          {/* Poner una imagen */}
          <p>Haz clic aquí para seleccionar imágenes</p>
        </div>
      </section>
      {selectedImages.length > 0 && (
        <section className='flex flex-col gap-4'>
          <article className='flex gap-2 flex-wrap'>
            {selectedImages.map((imageSrc, index) => (
              <picture key={imageSrc} className='block w-[70px] h-[70px] overflow-hidden rounded-md relative'>
                <img
                  src={imageSrc}
                  alt={`Selected ${index}`}
                  className='w-full h-full object-cover'
                />
                <button onClick={() => handleImageDelete(index)} className='absolute top-0 right-0 w-5 h-5 text-white bg-black/40 rounded-full'>
                  <svg className='p-1 rounded-full duration-150 hover:bg-black hover:rounded-full' viewBox="0 0 32 32"><g id="Layer_8" data-name="Layer 8"><path d="m31.16 2.26-1.42-1.42-13.74 13.75-13.74-13.75-1.42 1.42 13.75 13.74-13.75 13.74 1.42 1.42 13.74-13.75 13.74 13.75 1.42-1.42-13.75-13.74z" fill="#fff"></path></g></svg>
                </button>
              </picture>
            ))}
          </article>
          <article className='flex w-full justify-end'>
            <Button onClick={() => setSelectedImages([])} size='small' variant="outlined">Eliminar Todo</Button>
          </article>
        </section>
      )}
    </section>
  );
}