import ReactDOM from 'react-dom';
import Spinner from '../Spinner';
import { Overlay } from './styles';
import useAnimatedUnmounted from '../../hooks/useAnimatedUnmounted';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  let container = document.getElementById('loader-root');

  const { animatedRef, shouldRender } = useAnimatedUnmounted(isLoading);

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  if (!shouldRender) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay ref={animatedRef} isLeaving={!isLoading}>
      <Spinner size={90} />
    </Overlay>,
    container
  );
};

export default Loader;
