import ReactDOM from 'react-dom';
import { Overlay } from './styles';

interface LoaderProps {}

const Loader = ({}: LoaderProps) => {
  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader"></div>
    </Overlay>,
    container
  );
};

export default Loader;
