import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    children,
    disabled,
    className = '',
    type = 'button',
  }: ButtonProps, ref) => (
    <button
      type={type ? 'button' : 'submit'}
      className={twMerge(
        `w-full rounded-full border border-transparent bg-green-500 p-3
          font-bold text-black transition hover:opacity-75
          disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      ref={ref}
      disabled={disabled}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
