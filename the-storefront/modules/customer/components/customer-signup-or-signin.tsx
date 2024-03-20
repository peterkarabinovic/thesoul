'use client';

import { useState } from 'react';
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useCustomerStore } from '../data/state';
import { i18n_new_client, i18n_returning_customer, i18n_login, i18n_singup } from 'i18n';
import { CustomerSingUp } from './customer-signup';
import { CustomerLoginForm } from './customer-login-form';
import { CustomerGreeting } from './customer-greeting';

export function CustomerSignUpOrSignIn() {
  const [singupOrLogin, setSingupOrLogin] = useState<'login' | 'signup'>('signup');
  const singUpRecently = useCustomerStore((state) => state.singUpRecently());
  const customerId = useCustomerStore((state) => state.customerId);
  const customer = useCustomerStore((state) => state.customer);

  if (singUpRecently)
    return (
      <div className="w-full p-8">
        <CustomerGreeting customer={customer} linkToProfile="/profile" />
      </div>
    );

  if( customerId )
    return (null)

  return (
    <div className="w-full flex flex-col gap-4"> 
        <div className="customer-zone flex my-form-section-title">
            
            <CheckCircleIcon className='text-green-500 h-4 w-4 mr-1 sm:mr-2' />
            
            <h2 className="title text-[16px] leading-[28px] max-sm:whitespace-nowrap max-sm:text-ellipsis overflow-hidden">
                {
                    singupOrLogin == 'signup' ? i18n_returning_customer : i18n_new_client
                }
                <button
                    type="button"
                    className="ml-1 transition-all hover:text-primary underline"
                    onClick={
                        () => setSingupOrLogin(s => s == 'login' ? 'signup' : 'login')
                    }
                >
                    {
                        singupOrLogin == 'signup' ? i18n_login : i18n_singup
                    }
                </button>
            </h2>
        </div>


        <div className='py-0'>
            {singupOrLogin === 'signup' ? <CustomerSingUp /> : <CustomerLoginForm />}
        </div>
    </div>
  );
}
