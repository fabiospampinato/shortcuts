
/* ENUMS */

enum ListenerResult {
  HANDLED, // An handler caught that
  UNHANDLED, // No handler caught that, but maybe a deeper one could
  UNHANDLEABLE // No handled caught that, and there are no deeper handlers that could catch that
};

/* EXPORT */

export {ListenerResult};
