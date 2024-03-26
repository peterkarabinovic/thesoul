import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { i18n_loading } from 'i18n';

type AutocompleteProps = {
  title: string;
  subtitle?: string;
  placeholder: string;
  items: string[];
  curSelected: string,
  onChangeQeury: (q: string) => void;
  onSelectItem: (index: string, inputValue?: string) => void;
  disabled?: boolean;
  error?: string;
  processing?: boolean;
};

export function Autocomplete({
    title,
    subtitle,
    placeholder,
    items,
    processing,
    curSelected,
    onChangeQeury,
    onSelectItem,
    disabled,
    error
}: AutocompleteProps) {

    const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } = useCombobox({
        onInputValueChange: ({ inputValue }) => onChangeQeury(inputValue || ''),
        onSelectedItemChange: (item) => onSelectItem(item.selectedItem || '', item.inputValue),
        initialInputValue: curSelected,
        items
    });

    const inputProps = { ...getInputProps(), ...(!isOpen && { value: curSelected}), disabled }  

    return (
        <div className='flex flex-col w-full gap-1'>
            
            <div className="flex items-center justify-between">
                <label className="my-label">{title}</label>
                {subtitle && <label className={'text-xs text-neutral-500'}>{subtitle}</label>}
            </div>

            <div className='mx-auto relative w-full'>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-0.5 bg-white shadow-sm">
                        <input 
                            placeholder={placeholder} 
                            className="my-input w-full" 
                            {...inputProps} 
                        />
                    </div>
                </div>
                <ul
                    className={`absolute z-10 mt-1 w-full overflow-auto bg-white p-0 shadow-md ${
                    !(isOpen && (items.length || processing)) && 'hidden'
                    }`}
                    {...getMenuProps()}
                >
                    {processing && (
                        <li className="mt-2 flex justify-center     text-sm text-neutral-400">
                            <span className="loading loading-ring loading-sm" /> {i18n_loading}
                        </li>
                    )}
                    {isOpen && items.map((item, index) => (
                        <li
                            className={clsx(
                                highlightedIndex === index && 'bg-neutral-200',
                                selectedItem === item && 'font-bold',
                                'flex flex-col px-3 py-2 shadow-sm'
                            )}
                            key={index}
                            {...getItemProps({ item, index })}
                        >
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {error && (
                <div>
                <label className={'float-right text-xs text-error'}>{error}</label>
                </div>
            )}


        </div>
  );
}
