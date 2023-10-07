import { cn } from '../utils/cn';

function CustomCheckbox({
  isChecked,
  toggleCheckbox,
}: {
  isChecked: boolean;
  toggleCheckbox: () => void;
}) {
  const id = crypto.randomUUID();

  return (
    <div className='w-7 h-7'>
      <label
        className={cn(
          'border-2 rounded-full border-red-700 w-7 h-7 block',
          isChecked && 'border-green-600 bg-green-600'
        )}
        htmlFor={id}
      ></label>
      <input
        className='hidden'
        id={id}
        type='checkbox'
        checked={isChecked}
        onChange={toggleCheckbox}
      />
    </div>
  );
}

export default CustomCheckbox;
