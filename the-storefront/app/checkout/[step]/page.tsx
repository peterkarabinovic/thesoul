'use client';

import { CheckoutPage } from '@checkout/components';
import { ChechoutStep } from '@checkout/data';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { step: ChechoutStep };
};

export default function Page({ params: { step } }: PageProps) {
  const steps: ChechoutStep[] = ['cart', 'shipping', 'payment', 'review'];

  if (!steps.includes(step)) return notFound();

  return (
    <div>
      <CheckoutPage step={step} />
    </div>
  );
}
