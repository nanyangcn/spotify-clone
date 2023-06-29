import { Toaster } from 'react-hot-toast';

const ToasterProvider = () => (
  <Toaster toastOptions={{
    style: {
      background: 'white',
      color: 'black',
    },
  }}
  />
);

export default ToasterProvider;
