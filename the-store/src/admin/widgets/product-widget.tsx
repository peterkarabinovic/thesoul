import { useState } from "react";
import { useAdminUpdateProduct } from "medusa-react"
import { marked } from 'marked';

import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin"
  
const ProductWidget = ({ product, notify }: ProductDetailsWidgetProps) => {
    
    const [edit, setEdit] = useState(false);
    const [markdown, setMarkdown] = useState<string>( (product.metadata["extra_md"] || "") as string );
    const [markdownUi, setMarkdownUi] = useState(markdown);
    const updateProduct = useAdminUpdateProduct( product.id );
    const html = marked.parse(markdown) as string;

    const handleEditOnOff = () => {
        setEdit( d => !d )
        setMarkdownUi(markdown);
    }

    const handleOnSave = () => {
        updateProduct.mutate({
            metadata: {
                ...product.metadata,
                extra_md: markdownUi,
            }
        },{
            onSuccess: () => {
                setEdit(false)
                setMarkdown(markdownUi)
            }
        })
    }

    const textareaClassNames = "w-full h-full "
    const rawHtmlClasses = [
        "p-4",
        "[&>h1]:text-[30px] [&>h1]:mb-[14px]",
        "[&>h2]:text-[24px] [&>h2]:mb-[10px]",
        "[&>h3]:text-[20px] [&>h3]:mb-[7px]",
        "[&>ul]:list-disc [&>ul]:py-4",
        "[&>ul>li]:mb-[5px]",
        "[&>p]:py-4"
    ].join(' ');

    return (
      <div className="bg-white p-8 border border-gray-200 rounded-lg">
        <h1 className="text-grey-90 inter-xlarge-semibold">Опис у Markdown форматі</h1>
        <div className="w-full max-h-96">
            <div className={`w-full h-full ${rawHtmlClasses} ${edit ? "hidden" : ""}`} 
                dangerouslySetInnerHTML={{__html:html}}>
            </div>
            <div className={`${edit ? "" : "hidden"}  focus-within:shadow-input focus-within:border-violet-60 px-small py-xsmall bg-grey-5 border-grey-20 rounded-rounded flex w-full flex-col border`}>
                <textarea
                    className="relative resize-none overflow-hidden bg-inherit text-justify outline-none outline-0 focus:overflow-auto remove-number-spinner leading-base text-grey-90 caret-violet-60 placeholder-grey-40 w-full font-normal line-clamp-[var(--lines)] focus:line-clamp-none"
                    rows={10}
                    value={markdownUi}
                    onChange={ e => setMarkdownUi(e.target.value) }
                >        
                </textarea>
            </div>            
        </div>
        <div className="flex flex-row-reverse gap-x-4 mt-4">
            <button  
                className={`btn btn-secondary btn-small ${edit ? ""  : "hidden"}`}
                onClick={handleOnSave}
                disabled={markdown === markdownUi}
            >
                Зберегти
            </button>
            <button 
                className="btn btn-secondary btn-small"
                onClick={handleEditOnOff}
            >
                { edit ? "Скасувати" : "Редагувати" }
            </button>
        </div>
      </div>
    )
  }
  
  export const config: WidgetConfig = {
    zone: "product.details.after",
  }
  
  export default ProductWidget