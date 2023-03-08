import EventManager from '../lib/EventManager';

export const toastEventManager = new EventManager();

export interface toastProps {
  type: 'success' | 'default' | 'danger';
  text: string;
  duration?: number;
}

export default function toast(props: toastProps) {
  toastEventManager.emit('addtoast', {
    type: props.type,
    text: props.text,
    duration: props.duration,
  });
}
