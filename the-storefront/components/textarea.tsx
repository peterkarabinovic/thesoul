
type InputFieldPros = {
  If?: boolean;
  subtitle?: string;
  value: number | string | undefined;
  onChange: (val: string) => void;
  title: string;
  disabled?: boolean;
  error?: string;
};

export function TextArea(props: InputFieldPros) {
  const { If = true, title, subtitle, disabled, value, onChange, error } = props;

  if(!If)
    return (null);

  const classes = {
    input: 'my-input ',
    label: 'my-label'
  };

  return (
    <div className='flex flex-col w-full gap-[5px]'>
      <div className="flex items-center justify-between">
        <label className={classes.label}>{title}</label>
        {subtitle && <label className={'text-xs text-neutral-500'}>{subtitle}</label>}
      </div>

      <textarea 
        className="border border-primary focus-visible:outline-0 placeholder:text-[#7b7975] py-[10px] px-[20px] w-full min-h-[120px]"
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
       />

      {error && (
        <div>
          <label className={'float-right text-xs text-error'}>{error}</label>
        </div>
      )}
    </div>
  );
}
