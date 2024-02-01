'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

import { Money } from "commons/types";
import { formatPrice } from "lib/medusa/helpers"
import { TCartStore, useCartState } from "../data"

type CartDetailsProps = {
    useCart?: TCartStore;        
}

export function CartDetails({ useCart = useCartState}: CartDetailsProps){

    const cart = useCart( state => state.cart );
    const updateItem = useCart( state => state.updateItem );  
    const deleteItem = useCart( state => state.deleteVariant );
    const processing = useCart( state => state.processedVariants );  

    if(!cart || cart.lines.length === 0)
        return null;

    const handleQtChange = (variantId: string) => (qt: number) => {
        updateItem(variantId, qt);
    }

    const handleRemove = (variantId: string) => () => {
        deleteItem(variantId)
    }

    return (
        <div className="container w-full">
            <div className='flex flex-wrap justify-between'>
                    { cart.lines.map( (line, i) => (
                        <div key={i} className='w-full flex gap-4 py-7 border-t-2 border-base-200'>
                            <div className="relative shrink-0 bg-primary w-16 h-20 md:w-24 md:h-32">
                                <Image
                                    className="object-cover object-center"
                                    fill={true}
                                    src={line.thumbnail || ""}
                                    alt={line.title || ""}
                                    />
                            </div>
                            <div className='grid grid-cols-1 w-full'>
                                <div className="flex-1 justify-between flex gap-2 ">
                                    <div>
                                        <div className="text-base-content text-lg md:text-2xl font-medium">{line.title}</div>
                                        <div className="prose-sm text-neutral-500 md:prose-xl">{line.description}</div>
                                        <div className="prose-sm text-neutral-500">{formatPrice(line.unit_price)}</div>
                                    </div>
                                    <div className="flex gap-8 items-center lg:gap-12">                        
                                        <QuantitySelection qt={line.quantity} className='hidden md:block' onChange={handleQtChange(line.variant_id)}/>
                                        <Price price={line.cost.totalAmount} className="hidden md:block text-2xl w-24" processing={processing.includes(line.variant_id)} />
                                        <div className="mx-auto flex ">
                                            <button className='btn btn-ghost' onClick={handleRemove(line.variant_id) }>
                                                <TrashIcon className="w-5 h-5 text-neutral-500 md:w-6 md:h-6" />      
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className='pt-2 md:hidden justify-between flex gap-2 items-center'>
                                    <QuantitySelection qt={line.quantity} className='select-sm' onChange={handleQtChange(line.variant_id)}/>
                                    <Price price={line.cost.totalAmount} className="text-lg" processing={processing.includes(line.variant_id)}/>

                                </div>                
                            </div>
                            
                        </div>
                    
                    ))}
            </div>
        </div>
    )
}

function Price({price, className, processing = false}: {price: Money, className: string, processing?: boolean}){
    return (
        <p className={`text-base-content text-center font-medium whitespace-nowrap ${className}`}>
            { processing ? <span className="loading loading-ring loading-md" /> : formatPrice(price) }
        </p>
    );
}


type QuantitySelectionProps = {
    qt: number;
    range?: number[];
    className?: string;
    onChange: ( qt: number ) => void;
}

function QuantitySelection({qt, onChange, range=[1,2,3,4,5,6,7,8,9,10], className=''}: QuantitySelectionProps){

    return (
        <div className="">
            <select className={`select select-bordered w-full max-w-xs ${className}`} 
                    onChange={e => onChange(parseInt(e.target.value)) }>
                { range.map( (v,i) => 
                    <option key={i} selected={v === qt} value={v}>{v}</option>    
                )}
            </select>                  
        </div>      
    );
}