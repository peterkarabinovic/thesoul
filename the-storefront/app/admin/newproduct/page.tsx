'use client'
import { ArchiveBoxIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { InputField, TextArea } from 'components';
import { ProductImages } from './components/images';


export default function Products() {



  return (
    <div className="container">
        <div className="flex gap-4 items-center justify-between">
            <h4>Додати товар</h4>
            <button 
                className='flex gap-2 items-center text-sm my-primary-button'
                disabled={true}
            >
                <ArchiveBoxIcon className='w-5 h-5'/>
                Сохранить
            </button>    
        </div>

        <div className="my-form-section-title my-4">
                <CheckCircleIcon className='icon' />
                <h2>Загальний Опис</h2>
        </div>

        <div className='flex w-full md:flex-row flex-col mb-8'>
            <div className='md:basis-2/3'>

                <div className="w-full flex flex-col gap-4">
                    <div className='flex flex-col md:flex-row gap-4'>
                            <InputField
                                    title='Назва'
                                    placeholder='Назва товару'
                                    type='text'
                                    onChange={() => {}}
                                    value={''}
                                />
                                <InputField
                                    title='Підзаголовок'
                                    placeholder='Підзаголовок товару'
                                    type='text'
                                    onChange={() => {}}
                                    value={''}
                                />
                    </div>
                    <InputField
                            title='Handler - URL частка '
                            subtitle='Необов’язково'
                            placeholder='Необов’язково'
                            type='text'
                            onChange={() => {}}
                            value={''}
                    />

                    <TextArea
                        title='Опис 1'
                        onChange={() => {}}
                        value={''}
                    />
                    <TextArea
                        title='Опис 2'
                        onChange={() => {}}
                        value={''}
                    />
                    <TextArea
                        title='Опис 3'
                        onChange={() => {}}
                        value={''}
                    />
                </div>
                        

            </div>
            <div className='md:ml-8 md:basis-1/3 flex flex-col md:max-w-72 gap-4 mt-4 md:mt-0'>
                <InputField
                        title='Ширина (см)'
                        subtitle='Необов’язково'
                        type='number'
                        onChange={() => {}}
                        value={''}
                        optional={true}
                />

                <InputField
                        title='Висота (см)'
                        subtitle='Необов’язково'
                        type='number'
                        onChange={() => {}}
                        value={''}
                        optional={true}
                />
                
                <InputField
                        title='Довжина (см)'
                        subtitle='Необов’язково'
                        type='number'
                        onChange={() => {}}
                        value={''}
                        optional={true}
                />

                <InputField
                        title='Вага (кг)'
                        subtitle='Необов’язково'
                        type='number'
                        onChange={() => {}}
                        value={''}
                        optional={true}
                />
            </div>
        </div>

        <ProductImages 
            images={[
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg',
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg',
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg',
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg',
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg',
                'https://the-soul.s3.eu-central-1.amazonaws.com/man-box-1703678200324.jpg'
            ]} 
            setImages={() => {}}
        />
   </div>
  );
}