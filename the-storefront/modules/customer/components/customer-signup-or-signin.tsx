'use client';

import { useState } from 'react';
import { useCustomerStore } from '../data/state';
import { i18n_old_client, i18n_new_client } from 'i18n';
import { CustomerForm } from './customer-form';
import { CustomerLoginForm } from './customer-login-form';
import { CustomerGreeting } from './customer-greeting';
import clsx from 'clsx';

export function CustomerSignUpOrSignIn() {
  const [tab, setTab] = useState<'signin' | 'signup'>('signup');
  const logedIn = useCustomerStore((state) => state.logedIn());
  const customer = useCustomerStore((state) => state.customer);

  if (logedIn)
    return (
      <div className="w-full p-8">
        <CustomerGreeting customer={customer} linkToProfile="/profile" />
      </div>
    );

  return (
    <div className="w-full">
        <div className="tabs tabs-bordered">
            <a className={clsx("tab", {"tab-active": tab === 'signup'})} onClick={() => setTab('signup')}>{i18n_new_client}</a>
            <a className={clsx("tab", {"tab-active": tab === 'signin'})} onClick={() => setTab('signin')}>{i18n_old_client}</a>
        </div>
        <div className='py-4'>
            {tab === 'signup' ? <CustomerForm /> : <CustomerLoginForm />}
        </div>
    </div>
  );
}
