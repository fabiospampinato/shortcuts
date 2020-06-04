# Shortcuts

Super performant and feature rich shortcuts management library.

## Features

- **Super performant**: it's about as fast as it gets, I don't think it's possible to do significantly better than this.
- **Sequences support**: sequences (a.k.a. konami codes), are supported too, so you can bind actions to <kbd>Up Right Down Left</kbd> or whatever shortcuts sequence you want.
- **Shortcut to Accelerator**: supported shortcuts can be converted to their [Electron's Accelerator](https://electronjs.org/docs/api/accelerator) equivalent.
- **Shortcut to symbols**: supported shortcuts can be converted to symbols (e.g. `⌘A`), this is useful for providing shortcut hints in tooltips.

## Install

```sh
npm install --save shortcuts
```

## Usage

This library provides a [`Shortcuts`](#shortcuts-class) class, which will manage your [shortcuts](#shortcut-syntax), and a [`Shortcut`](#shortcut-object) object, which provides some utilities.

### Shortcut Syntax

The following keys can be used when defining a shortcut:

- **Modifiers**: <kbd>Alt</kbd>/<kbd>Option</kbd>, <kbd>Cmd</kbd>/<kbd>Command</kbd>/<kbd>Meta</kbd>, <kbd>Ctrl</kbd>/<kbd>Control</kbd>, <kbd>Shift</kbd>, <kbd>CmdOrCtrl</kbd>/<kbd>CommandOrControl</kbd>.
- **Digits**: <kbd>1-9</kbd>.
- **Alphabet letters**: <kbd>A-Z</kbd>.
- **Function keys**: <kbd>F1-F24</kbd>.
- **Numpad digits**: <kbd>Numpad0-Numpad9</kbd>.
- **Special keys**: <kbd>Backspace</kbd>, <kbd>Capslock</kbd>, <kbd>Del</kbd>/<kbd>Delete</kbd>, <kbd>Down</kbd>, <kbd>End</kbd>, <kbd>Enter</kbd>/<kbd>Return</kbd>, <kbd>Esc</kbd>/<kbd>Escape</kbd>, <kbd>Home</kbd>, <kbd>Insert</kbd>, <kbd>Left</kbd>, <kbd>PageDown</kbd>, <kbd>PageUp</kbd>, <kbd>Right</kbd>, <kbd>Space</kbd>/<kbd>Spacebar</kbd>, <kbd>Tab</kbd>, <kbd>Up</kbd>.
- **Punctuation keys**: <kbd>!</kbd>, <kbd>"</kbd>, <kbd>#</kbd>, <kbd>$</kbd>, <kbd>%</kbd>, <kbd>&</kbd>, <kbd>'</kbd>, <kbd>(</kbd>, <kbd>)</kbd>, <kbd>*</kbd>, <kbd>+</kbd>/<kbd>plus</kbd>, <kbd>,</kbd>, <kbd>-</kbd>, <kbd>.</kbd>, <kbd>/</kbd>, <kbd>:</kbd>, <kbd>;</kbd>, <kbd><</kbd>, <kbd>=</kbd>, <kbd>></kbd>, <kbd>?</kbd>, <kbd>@</kbd>, <kbd>[</kbd>, <kbd>\\</kbd>, <kbd>]</kbd>, <kbd>^</kbd>, <kbd>_</kbd>, <kbd>`</kbd>, <kbd>{</kbd>, <kbd>|</kbd>, <kbd>}</kbd>, <kbd>~</kbd>.

Other keys are not supported.

- ℹ️ Shortcuts are case insensitive.
- ℹ️ Keys in a single shortcut must be joined by a plus sign (e.g. <kbd>Ctrl+A</kbd>).
- ℹ️ Sequences of shortcuts must be joined by a space (e.g. <kbd>Ctrl+K Ctrl+B</kbd>).

### Shortcuts Class

The Shortcuts class will be used for adding/removing/resetting/recording shortcuts. This is its interface:

```ts
class Shortcuts {
  constructor ( options?: { shortcuts?: ShortcutDescriptor[]: capture?: boolean, target?: Node, shouldHandleEvent?: event => boolean } );
  get (): ShortcutDescriptor[];
  add ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] );
  remove ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] );
  reset ();
  record ( handler: ( shortcut ) => any ): Function;
}
```

- ℹ️ The `shortcuts` option accepts an optional array of shortcuts descriptors. More on this below.
- ℹ️ The `capture` option governs whether events are attached for the capturing phase or for the bubbling phase of the propagation.
- ℹ️ The `target` option accepts an optional DOM node, where the keyboard evenr listener will be attached to.
- ℹ️ The `shouldHandleEvent` option accepts an optional function which will be used for determining, for each keyboard event, if it should be handled by this library. By default that function is: `event => !event.defaultPrevented`.

A shortcut descriptor looks like this:

```ts
{
  handler?: ( event: KeyboardEvent ) => boolean | void,
  shortcut: string
}
```

Usage:

```ts
import {Shortcuts} from 'shortcuts';

const shortcuts = new Shortcuts ();

function CtrlBHandler () {};

shortcuts.add ([ // Adding some shortcuts
  { shortcut: 'Ctrl+A', handler: event => {
    console.log ( event );
    return true; // Returning true because we don't want other handlers for the same shortcut to be called later
  }},
  { shortcut: 'Ctrl+B', handler: CtrlBHandler },
  { shortcut: 'CmdOrCtrl+K Shift+B', handler: () => {
    // Doing something...
    return true; // Returning true because we don't want other handlers for the same shortcut to be called later
  }},
  { shortcut: '-Ctrl+A' } // Removing the previous shortcut
]);

shortcuts.remove ({ shortcut: 'Ctrl-B', handler: CtrlBHandler }); // Removing a single handler
shortcuts.remove ({ shortcut: 'Ctrl-A' }); // Removing all handlers bound to this shortcut

shortcuts.reset (); // Removing all shortcuts

const dispose = shortcuts.record ( shortcut => { // Recording shortcuts
  console.log ( 'Shortcut recorded:', shortcut );
});

dispose (); // Stopping recording
```

- ℹ️ Handlers are called from the bottom to the top, so an handler defined at the bottom will take precedence over an handler for the same shortcut defined at the top.
- ℹ️ If multiple handlers are defined for the same shortcut all of them are executed until one of them returns `true`.
- ℹ️ Adding a shortcut starting with an hyphen (e.g. `-Ctrl-A`) will actually remove that shortcut.
- ℹ️ While recording no handlers will be called.

### Shortcut Object

The Shortcut object provides some utilities that you might need in your application. This is its interface:

```ts
const Shortcut = {
  shortcut2id ( shortcut: string ): number[];
  shortcut2accelerator ( shortcut: string ): string;
  shortcut2symbols ( shortcut: string ): string;
};
```

Usage:

```ts
import {Shortcut} from 'shortcuts';

Shortcut.shortcut2accelerator ( 'Meta+Del' ); // => 'Cmd+Delete'
Shortcut.shortcut2symbols ( 'Cmd+Shift+A' ); // => '⌘⇧A'
```

## Thanks

- Thanks to the people at [Koding](https://github.com/koding) for providing me the `shortcuts` package name on NPM! If you're looking for the previous package published under that name you can find it [here](https://github.com/koding/shortcuts) (`v0.x`).

## License

MIT © Fabio Spampinato
