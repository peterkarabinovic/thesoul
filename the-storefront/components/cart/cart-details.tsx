import { TrashIcon } from '@heroicons/react/24/outline';
import { Cart, Money } from "lib/data";
import { formatPrice } from "lib/medusa/helpers"

type CartDetailsProps = {
    cart: Cart | null;        
}

export function CartDetails({cart}: CartDetailsProps){

    if(!cart || cart.lines.length === 0)
        // TODO: Add a Empty Cart state
        return null;

    return (
        <div className="container mx-auto p-4 lg:p-8 lg:max-w-6xl">
            { cart.lines.map( (line, i) => (
                <div key={i} className='w-full flex gap-4 py-7'>
                    <div className="shrink-0 bg-primary w-16 h-20 sm:w-24 sm:h-32"></div>
                    <div className='grid grid-cols-1 w-full'>
                        <div className="flex-1 justify-between flex gap-2 ">
                            <div>
                                <div className="text-base-content text-lg sm:text-2xl font-medium">Product Name</div>
                                <div className="prose text-neutral-500 sm:prose-xl">Product Description</div>
                            </div>
                            <div className="flex gap-8 items-center lg:gap-12">                        
                                <QuantitySelection qt={5} className='hidden sm:block'/>
                                <PriceBlock price={{amount:"200000", currencyCode: "UAH"}} className="hidden sm:block text-2xl" />
                                <div className="mx-auto flex ">
                                    <TrashIcon className="w-5 h-5 text-neutral-500 sm:w-6 sm:h-6" />      
                                </div>
                            </div>
                        </div>

                        <div className='pt-2 sm:hidden justify-between flex gap-2 items-center'>
                            <PriceBlock price={{amount:"200000", currencyCode: "UAH"}} className="text-lg" />
                            <QuantitySelection qt={5} className='select-sm'/>
                        </div>                
                    </div>
                </div>

            ))}
        </div>
    )
}

function PriceBlock({price, className}: {price: Money, className: string}){
    return (
        <p className={`text-base-content  font-medium whitespace-nowrap ${className}`}>
            {formatPrice(price)}
        </p>
    );
}


function QuantitySelection({qt, range=[1,2,3,4,5,6,7,8,9,10], className=''}: {qt: number, range?: number[], className?: string}){

    return (
        <div className="">
            <select className={`select select-bordered w-full max-w-xs ${className}`}>
                { range.map( (v,i) => 
                    <option key={i} selected={v === qt} value={v}>{v}</option>    
                )}
            </select>                  
        </div>      
    );
}