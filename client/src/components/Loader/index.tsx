import ReactDOM from 'react-dom';
import Spinner from '../Spinner';
import { Overlay } from './styles';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    container
  );
};

export default Loader;
