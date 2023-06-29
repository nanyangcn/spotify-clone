import { IoMdClose } from 'react-icons/io';

interface BoxProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Modal = ({
  isOpen, onChange, title, description, children,
}: BoxProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-neutral-900/90 backdrop-blur-sm">
      <div
        className="h-full max-h-full w-full rounded-md border border-neutral-700
      bg-neutral-800 p-[25px] drop-shadow-md focus:outline-none
        md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]"
      >
        <div className="mb-4 text-center text-xl font-bold">
          {title}
        </div>
        <div className="mb-5 text-center text-sm leading-normal">
          {description}
        </div>
        <div>
          {children}
        </div>
        <button
          className="absolute right-[10px] top-[10px] rounded-full text-neutral-400
          hover:text-white focus:outline-none"
          type="button"
          onClick={() => onChange(false)}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
