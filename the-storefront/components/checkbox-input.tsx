import clsx from 'clsx';

type Pros = {
  If?: boolean;
  subtitle?: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  title: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
};

export function CheckboxInput(props: Pros) {
  const { If = true, title, subtitle, disabled, checked, onChange, error, placeholder } = props;

  if(!If)
    return (null);

  return (
    <div className='flex flex-col w-full gap-1'>

        <label className='flex flex-row gap-2'>
            <input
                type="checkbox"
                className={clsx("", { 'border-error': error })}
                placeholder={placeholder || ''}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <div className="flex items-center justify-between">
                <span>{title}</span>
                {subtitle && <label className={'text-xs text-neutral-500'}>{subtitle}</label>}
            </div>
        </label>

      {error && (
        <div>
          <label className={'float-right text-xs text-error'}>{error}</label>
        </div>
      )}
    </div>
  );
}
