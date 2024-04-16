'use client'
import Image from 'next/image';
import { CheckCircleIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/solid";

type Props = {
  images: string[];
  setImages: (images: string[]) => void;
};

export function ProductImages({ images, setImages }: Props) {
  return (
    <div className="flex flex-col">
      <div className="my-form-section-title my-4">
        <CheckCircleIcon className="icon" />
        <h2>Картинки</h2>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
           { images.map((img, i) => (
            <div key={i} className='flex flex-col bg-gray-100 items-center p-4 relative'>
                <Image
                    src={img}
                    className='object-cover object-center'
                    alt="product image"
                    width={200}
                    height={150}
                />
                <div className='flex flex-row text-primary'>
                    <a href={img} target='_blank' className="text-xs">
                        {img}                        
                    </a>
                    <TrashIcon 
                        className='w-4 h-4 button-0 right-2 absolute cursor-pointer'  
                        title='Видалити картинку'
                        onClick={() => setImages(images.filter((_, indx) => indx !== i))}
                    />
                </div>
            </div>
           ))} 
           <div className='m-auto'>
                <button className='my-secondary-link'>
                    <PlusIcon className='w-8 h-8 mr-2'/>
                    Додати картинку
                </button>
           </div>
      </div>
    </div>
  );
}
