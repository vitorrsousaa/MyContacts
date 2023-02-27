interface toastProps {
  type: 'success' | 'default' | 'danger';
  text: string;
}

export default function toast({ type, text }: toastProps) {
  const event = new CustomEvent('addtoast', {
    detail: {
      type,
      text,
    },
  });

  document.dispatchEvent(event);
}
