# Shortcuts

Super performant and feature rich shortcuts management library.

This library is just a thin wrapper over [`ShoSho`](https://github.com/fabiospampinato/shosho) that provides a VSCode-like interface for managing shortcuts. Definitely check out [`ShoSho`](https://github.com/fabiospampinato/shosho), which provides more features and it may offer a lower-level but maybe more convenient API for your use case.

## Install

```sh
npm install --save shortcuts
```

## Usage

The following interface is provided:

```ts
type Descriptor = {
  handler?: ( event?: Event ): boolean | void,
  shortcut: string
};

type Disposer = {
  (): void
};

type Options = {
  capture?: boolean,
  target?: Window | Document | HTMLElement | SVGElement | MathMLElement,
  shouldHandleEvent?: ( event: Event ) => boolean
};

class Shortcuts {
  constructor ( options: Options );
  get (): Descriptor[];
  add ( descriptor: Descriptor | Descriptor[] ): void;
  register ( descriptor: Descriptor | Descriptor[] ): Disposer;
  remove ( descriptor: Descriptor | Descriptor[] ): void;
  reset (): void;
  trigger ( shortcut: string ): boolean;
  start (): void;
  stop (): void;
}
```

This is how you'd use the library:

```ts
import Shortcuts from 'shortcuts';

// Let's create a new shortcuts manager instance

const shortcuts = new Shortcuts ({
  capture: true, // Handle events during the capturing phase
  target: document, // Listening for events on the document object
  shouldHandleEvent ( event ) {
    return true; // Handle all possible events
  }
});

// Let's register and unregister some shortcuts
// Handlers are filtered by shortcut and executed from bottom to top, stopping at the first handler that returns true

const onCtrlB = () => {};

shortcuts.add ([
  {
    shortcut: 'Ctrl+A',
    handler: () => {
      // Doing something...
      return true; // Returning true if we don't want other handlers for the same shortcut to be called later
    }
  },
  {
    shortcut: 'Ctrl+B',
    handler: onCtrlB
  },
  {
    shortcut: 'CmdOrCtrl+K Shift+B',
    handler: () => {
      // Doing something...
      return true; // Returning true if we don't want other handlers for the same shortcut to be called later
    }
  },
  {
    shortcut: '-Ctrl+A' // Removing all previously-registered handlers for "Ctrl+A"
  }
]);

shortcuts.remove ({ shortcut: 'Ctrl+B', handler: onCtrlB }); // Removing a specific handler bound to this shortcut
shortcuts.remove ({ shortcut: 'Ctrl+A' }); // Removing all handlers bound to this shortcut

// Let's actually start listening for shortcuts

shortcuts.start ();

// Let's stop listening for shortcuts

shortcuts.stop ();

// Let's dispose of all registered shortcuts

shortcuts.reset ();
```

## Thanks

- Thanks to the people at [Koding](https://github.com/koding) for providing me the `shortcuts` package name on NPM! If you're looking for the previous package published under that name you can find it [here](https://github.com/koding/shortcuts) (`v0.x`).

## License

MIT © Fabio Spampinato
