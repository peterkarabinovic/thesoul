import { MapPinIcon, ShoppingCartIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

// Taken from here
// https://www.hyperui.dev/components/application-ui/steps

type CheckoutStepsProps = {
  onClick: (step: number) => void;
  disabledSteps: number[];  
  step: number;
};

export function CheckoutSteps({ step, onClick, disabledSteps }: CheckoutStepsProps) {

  const steps = [
    {
        title: "Кошик",
        icon: ShoppingCartIcon
    },
    {
        title: "Доставка",
        icon: MapPinIcon
    },
    {
        title: "Оплата",
        icon: CreditCardIcon
    }
  ];

  const lastIndex = steps.length - 1;

  const isDisabled = (index: number) => step !== index && disabledSteps.includes(index);
  const isClickable = (index: number) => step !== index && !disabledSteps.includes(index);
  return (
    <div>
      <div>
        <ol
          className={clsx('flex w-full text-sm overflow-x-auto border-primary')}
        >
          {steps.map((item, index) => (
            <li
              key={item.title}
              className={clsx(`relative flex items-center justify-center gap-2 p-4 min-w-48 w-full`,
                        step === index ? "bg-primary text-light" : "bg-light text-primary",
                        step !== index ? "border-primary border-y border-r": "",
                        index === 0 ? "border-l" : "",
                        isDisabled(index) ? "cursor-not-allowed text-opacity-50" : "" ,
                        isClickable(index) ? "cursor-pointer" : ""

              )}
              onClick={() => isClickable(index) && onClick(index)}
            >
              <item.icon className="h-7 w-7 opacity-80" />

              <p className="leading-none">
                <strong className="block font-medium"> {item.title} </strong>
                {/* <small className="mt-1"> Some info about you. </small> */}
              </p>
              {index !== lastIndex && <Arrow selected={step === index}/>}
            </li>
          )
          )}
        </ol>
      </div>
    </div>
  );
}

function Arrow({ selected }: { selected: boolean }) {
  return (
    <span
      className={clsx(
        'absolute -right-2 top-1/2 z-10 h-4 w-4 -translate-y-1/2 rotate-45',
        selected ? 'bg-primary' : 'bg-light',
        {
          'border-r border-t': !selected,
          'border-primary': !selected
        }
      )}
    ></span>
  );
}
