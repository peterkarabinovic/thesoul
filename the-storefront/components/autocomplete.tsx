import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { i18n_loading } from 'i18n';

type AutocompleteProps = {
  placeholder: string;
  items: string[];
  processing: boolean;
  curSelected: string,
  onChangeQeury: (q: string) => void;
  onSelectItem: (index: string, inputValue?: string) => void;
  disabled?: boolean;
};
export function Autocomplete({
  placeholder,
  items,
  processing,
  curSelected,
  onChangeQeury,
  onSelectItem,
  disabled
}: AutocompleteProps) {

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps, selectedItem } =
    useCombobox({
      onInputValueChange: ({ inputValue }) => onChangeQeury(inputValue || ''),
      onSelectedItemChange: (item) => onSelectItem(item.selectedItem || '', item.inputValue),
      initialInputValue: curSelected,
      items
    });

  const inputProps = { ...getInputProps(), ...(!isOpen && { value: curSelected}), disabled }  
  const inputClasses = "input input-sm input-bordered sm:input-md w-full focus:border-none"  
  return (
    <div className='mx-auto relative'>
      <div className="flex w-full flex-col gap-1">
        <div className="flex gap-0.5 bg-white shadow-sm">
          <input placeholder={placeholder} className={inputClasses} {...inputProps} />
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
        {isOpen &&
          items.map((item, index) => (
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
  );
}
