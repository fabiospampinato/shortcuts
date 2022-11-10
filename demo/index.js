
/* IMPORT */

import {Shortcut, Shortcuts} from '../dist/index.js';

/* HELPERS */

const log = document.getElementById ( 'log' );

function scrollBottom () {
  document.body.scrollTop = Number.MAX_SAFE_INTEGER;
}

function logHandler ( id, event, result ) {
  const handledEmoji = !result ? '✅' : '❌';
  const shortcuts = id.map ( ( _, index ) => Shortcut.id2accelerator ( id.slice ( index ) ) );
  log.innerHTML += `<pre>${handledEmoji} - ${event.type} - ${shortcuts.map ( s => `<kbd>${s}</kbd>` ).join ( ', ' )}</pre>`;
  scrollBottom ();
}

function logHandled ( shortcut ) {
  setTimeout ( () => { // Hacky way to run this after `logHandler`
    log.innerHTML += `<pre>   → <kbd>${shortcut}</kbd></pre>`;
    scrollBottom ();
  });
  return true;
}

function logRecorded ( shortcut ) {
  log.innerHTML += `<pre>⏺ - record  - <kbd>${shortcut}</kbd></pre>`;
  scrollBottom ();
}

function logClear () {
  log.innerHTML = '';
}

function patch ( shortcuts ) {
  const _handler = shortcuts.listener.options.handler
  shortcuts.listener.options.handler = function ( id, event ) {
    const result = _handler.call ( this, id, event );
    if ( !shortcuts.recordHandler ) {
      logHandler ( id, event, result );
    }
    return result;
  };
}

/* INIT */

const shortcuts = new Shortcuts ();

patch ( shortcuts ); // For logging purposes

shortcuts.add ([
  { shortcut: 'A', handler: () => logHandled ( 'A' ) },
  // { shortcut: 'S', handler: () => logHandled ( 'S' ) },
  // { shortcut: 'CmdOrCtrl+K A', handler: () => logHandled ( 'CmdOrCtrl+K A' ) },
  { shortcut: 'Ctrl+A', handler: () => logHandled ( 'Ctrl+A' ) },
  { shortcut: 'Alt+B', handler: () => logHandled ( 'Alt+B' ) },
  { shortcut: 'Shift+C', handler: () => logHandled ( 'Shift+C' ) },
  { shortcut: 'Shift+4', handler: () => logHandled ( 'Shift+4' ) },
  { shortcut: 'Shift+%', handler: () => logHandled ( 'Shift+%' ) },
  { shortcut: 'Cmd+D', handler: () => logHandled ( 'Cmd+D' ) },
  { shortcut: 'Cmd+E', handler: () => logHandled ( 'Cmd+E' ) },
  { shortcut: 'Cmd+E', handler: () => logHandled ( 'Cmd+E (Second)' ) },
  { shortcut: 'Cmd+J', handler: () => logHandled ( 'Cmd+J' ) },
  { shortcut: 'Cmd+L', handler: () => logHandled ( 'Cmd+L' ) },
  { shortcut: '-Cmd+L' },
  { shortcut: 'Ctrl+Space', handler: () => logHandled ( 'Cmd+Space' ) },
  { shortcut: 'Cmd+Backspace', handler: () => logHandled ( 'Cmd+Backspace' ) },
  { shortcut: 'Cmd+Esc', handler: () => logHandled ( 'Cmd+Esc' ) },
  { shortcut: 'Cmd+Alt+Shift+Control+F', handler: () => logHandled ( 'Cmd+Alt+Shift+Control+F' ) },
  { shortcut: 'CmdOrCtrl+K Shift+%', handler: () => logHandled ( 'CmdOrCtrl+K Shift+%' ) },
  { shortcut: 'CmdOrCtrl+B Shift+^ CmdOrCtrl+B Shift+^', handler: () => logHandled ( 'CmdOrCtrl+B Shift+^ CmdOrCtrl+B Shift+^' ) },
  { shortcut: 'CmdOrCtrl+K CmdOrCtrl+K', handler: () => { logClear (); return logHandled ( `CmdOrCtrl+K CmdOrCtrl+K` ); } },
  { shortcut: 'Up Right Down Left', handler: () => logHandled ( 'Up Right Down Left' ) },
  // { shortcut: 'Right Down', handler: () => logHandled ( 'Right Down' ) }
  { shortcut: 'Ctrl Ctrl', handler: () => logHandled ( 'Ctrl Ctrl' ) },
  { shortcut: 'Alt+/', handler: () => logHandled ( 'Alt+/' ) },
  { shortcut: 'Alt', handler: () => logHandled ( 'Alt' ) }
]);

shortcuts.remove ([
  { shortcut: 'Cmd+J' }
]);

/* MANUAL TESTING */

// Alphabet
// Digit
// Punctuation
// Shift+Alphabet
// Shift+Digit
// Shift+Punctuation
// Ctrl+Alphabet
// Ctrl+Digit
// Ctrl+Punctuation
// Cmd+Alphabet
// Cmd+Digit
// Cmd+Punctuation
// Alt+Alphabet
// Alt+Digit
// Alt+Punctuation
// Ctrl+Shift+Alphabet
// Ctrl+Shift+Digit
// Ctrl+Shift+Punctuation
// Cmd+Shift+Alphabet
// Cmd+Shift+Digit
// Cmd+Shift+Punctuation
// Alt+Shift+Alphabet
// Alt+Shift+Digit
// Alt+Shift+Punctuation
// Ctrl+Alt+Shift+Cmd+Alphabet
// Ctrl+Alt+Shift+Cmd+Digit
// Ctrl+Alt+Shift+Cmd+Punctuation
// Alt

//FIXME: The following shortcuts make keypress misfire for some reason
// Ctrl+Shift+6 keypress ??
// Ctrl+Shift+- keypress ??
// Ctrl+Shift+[ keypress ??
// Ctrl+Shift+] keypress ??
// Ctrl+Shift+\ keypress ??

/* RECORD */

let recordDispose;

window.record = () => {
  window.unrecord ();
  recordDispose = shortcuts.record ( logRecorded );
};

window.unrecord = () => {
  if ( recordDispose ) recordDispose ();
};
