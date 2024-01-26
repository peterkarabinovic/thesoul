import clsx from 'clsx';

type InputFieldPros = {
  type: 'text' | 'number';
  subtitle?: string;
  value: number | string | undefined;
  onChange: (val: string) => void;
  title: string;
  disabled: boolean;
  placeholder?: string;
  error?: string;
};

export function InputField(props: InputFieldPros) {
  const { title, subtitle, disabled, value, onChange, error, placeholder } = props;
  const classes = {
    input: 'input input-sm input-bordered sm:input-md w-full focus:border-none',
    label: 'label text-neutral block text-sm sm:text-base'
  };

  const type = typeof value === 'number' ? 'number' : 'text';
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className={classes.label}>{title}</label>
        {subtitle && <label className={'text-xs text-neutral-500'}>{subtitle}</label>}
      </div>

      <input
        type={type}
        className={clsx(classes.input, { 'border-error': error })}
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
