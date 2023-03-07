interface EventMap {
  [key: string]: Function[];
}

export default class EventManager {
  private listeners: EventMap;

  constructor() {
    this.listeners = {};
  }

  on<T extends unknown[]>(event: string, listener: (...arg: T) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(listener);
  }

  emit<T extends unknown[]>(event: string, ...args: T) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }

  removeListener(event: string, listenerToRemove: Function) {
    const listeners = this.listeners[event];

    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);
    this.listeners[event] = filteredListeners;
  }
}
