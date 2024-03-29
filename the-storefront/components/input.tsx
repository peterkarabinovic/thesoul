import clsx from 'clsx';

type InputFieldPros = {
  If?: boolean;
  type: 'text' | 'number';
  subtitle?: string;
  value: number | string | undefined;
  onChange: (val: string) => void;
  title: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
};

export function InputField(props: InputFieldPros) {
  const { If = true, title, subtitle, disabled, value, onChange, error, placeholder } = props;

  if(!If)
    return (null);


  const type = typeof value === 'number' ? 'number' : 'text';
  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div className="flex items-center justify-between">
        <label className="my-label">{title}</label>
        {subtitle && <label className={'text-xs text-neutral-500'}>{subtitle}</label>}
      </div>

      <input
        type={type}
        className={clsx("my-input", { 'border-error': error })}
        placeholder={placeholder || ''}
        value={value}
        onChange={(e) => onChange(e.target.value.trim())}
        disabled={disabled}
      />
      {error && (
        <div>
          <label className={'float-right text-xs text-error'}>{error}</label>
        </div>
      )}
    </div>
  );
}
