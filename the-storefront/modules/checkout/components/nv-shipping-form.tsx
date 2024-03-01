import { i18n_city, i18n_input_city, i18n_novaposhta_weahouse, i18n_address, i18n_input_address } from "i18n"
import { Autocomplete } from "components/autocomplete"
import { TChechoutStore, useChechoutState } from '../data';

type NovaposhtaShippingFormPros = {
    useChechout?: TChechoutStore
}
export function NovaposhtaShippingForm({useChechout = useChechoutState}: NovaposhtaShippingFormPros) {
    
  const processing = useChechout((state) => state.processing);
  const selectedOption = useChechout((state) => state.selectedOption);

  const {
    shippingCity,
    shippingAddress,
    searchCity,
    cityQuery,
    cityList,
    receintAddresses,
    selectCity,    
    searchWarehouse,
    selectWarehouse,
    setAddress,
    warehouseList,
    warehouseQuery
    
  } = useChechout((state) => state);


  const handelCitySelection = (name:string) => selectCity( cityList.find(c => c.name === name)  )
  const handelWarehouseSelection = (name:string) => selectWarehouse( warehouseList.find(c => c.name === name)  );


  const label = 'label text-neutral block text-sm sm:text-base';
//   const inputClasses = "input input-sm input-bordered sm:input-md w-full focus:border-none"  

  if( !selectedOption )
    return ("dsd");

  return <div className="w-full flex flex-col gap-2">
    <div>
        <label className={label}>{i18n_city}</label>
        <Autocomplete
            curSelected={cityQuery}
            items={cityList.map(c => c.name)}
            placeholder={i18n_input_city}
            processing={processing}
            onChangeQeury={searchCity}
            onSelectItem={handelCitySelection}
        />
    </div>
    { selectedOption.id === 'shipping-to-warehouse' && <div>
        <label className={label}>{i18n_novaposhta_weahouse}</label>
        <Autocomplete
            curSelected={warehouseQuery}
            items={warehouseList.map(c => c.name)}
            placeholder={i18n_novaposhta_weahouse}
            processing={processing}
            onChangeQeury={searchWarehouse}
            onSelectItem={handelWarehouseSelection}
            disabled={!shippingCity}
        />
    </div>}
    { selectedOption.id === 'shipping-to-door' && <div>
        <label className={label}>{i18n_address}</label>
        <Autocomplete
            curSelected={shippingAddress}
            items={receintAddresses.filter( aa => aa.includes(shippingAddress) ) }
            placeholder={i18n_input_address}
            processing={false}
            onChangeQeury={setAddress}
            onSelectItem={setAddress}
            disabled={!shippingCity}
        />
    </div>}

  </div>;
}

