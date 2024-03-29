import clsx from 'clsx';
import { usePhoneInput } from 'react-international-phone';


type Props = {
    phoneCode: string;
    phone?: string;
    onChange: (phone: string) => void;
    disabled?: boolean;
    i18nPhone: string;
}

export function PhoneInput( { disabled, phoneCode, phone, onChange, i18nPhone }: Props ) {

    

    const { inputValue, handlePhoneValueChange } = usePhoneInput({
        defaultCountry: 'ua',
        disableCountryGuess: true,
        disableDialCodeAndPrefix: true,
        forceDialCode: true,
        value: phone,
        onChange: ({phone}) => {
            onChange(phone);
        }
      });
    
    return (
        <div className='flex flex-col w-full gap-[5px]'>
            <label className={'my-label'}>{i18nPhone}</label>
            <div className="flex flex-row">
            <div
                className={clsx(
                    'my-phone-code text-center', 
                    phoneCode.length == 3 ? "w-14" : "w-16",
                    disabled ? 'opacity-70' : "" )
                }
            >
                {phoneCode}
            </div>
            <input
                type="tel"
                placeholder="(88) 888-88-88"
                className={'my-input'}
                value={inputValue}
                onChange={handlePhoneValueChange}
                disabled={disabled}
            />
            </div>
        </div>

    );
}