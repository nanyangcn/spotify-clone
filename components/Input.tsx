import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { FieldErrors } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldErrors[string];
  errMsg?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  label,
  className = '',
  type,
  disabled,
  placeholder = '',
  error,
  errMsg,
  ...props
}, ref) => (
  <label htmlFor={id}>
    {label}
    <input
      className={twMerge(
        `flex w-full rounded-md border-2 border-transparent bg-neutral-700 p-3 text-sm file:mr-4
        file:border file:rounded-full file:bg-transparent file:text-sm file:font-medium file:hover:cursor-pointer
      placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
      aria-required:border-red-500 aria-required:text-red-500`,
        className,
      )}
      type={type}
      disabled={disabled}
      ref={ref}
      placeholder={placeholder}
      {...props}
    />
    {error && <p className="text-red-500" role="alert">{errMsg}</p>}
  </label>

));

Input.displayName = 'Input';

export default Input;
