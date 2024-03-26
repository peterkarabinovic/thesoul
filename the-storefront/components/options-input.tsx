
type OptionsInputPros = {
  If?: boolean;
  title: string;
  subtitle?: string;
  options: string[];
  selected: string;
  onSelect: (val: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export function OptionsInput(props: OptionsInputPros) {
  const { If = true, title, subtitle, disabled, options, selected, onSelect, error, className = "" } = props;

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

        <select className={`my-input w-full ${className}`} 
                defaultValue={selected}
                onChange={e => onSelect(e.target.value) }
                disabled={disabled}
        >
            { options.map( (v,i) => 
                <option key={i} value={v}>{v}</option>    
            )}
        </select>                  

      {error && (
        <div>
          <label className={'float-right text-xs text-error'}>{error}</label>
        </div>
      )}
    </div>
  );
}
