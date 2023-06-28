
/* IMPORT */

import Shortcuts from '../src';

/* HELPERS */

const yep = message => {
  return () => {
    console.log ( `✅ ${message}` );
    return true;
  };
};

const nope = message => {
  return () => {
    console.log ( `❌ ${message}` );
    return false;
  };
};

/* MAIN - LISTENING */

const shortcuts = new Shortcuts ();

shortcuts.add ([
  { shortcut: '0', handler: yep ( '0' ) },
  { shortcut: '1', handler: yep ( '1' ) },
  { shortcut: '2', handler: yep ( '2' ) },
  { shortcut: '3', handler: yep ( '3' ) },
  { shortcut: '4', handler: yep ( '4' ) },
  { shortcut: '5', handler: yep ( '5' ) },
  { shortcut: '6', handler: yep ( '6' ) },
  { shortcut: '7', handler: yep ( '7' ) },
  { shortcut: '8', handler: yep ( '8' ) },
  { shortcut: '9', handler: yep ( '9' ) }
]);

shortcuts.add ([
  { shortcut: '5', handler: yep ( '5 (2)' ) },
  { shortcut: '6', handler: yep ( '6 (2)' ) },
  { shortcut: '7', handler: yep ( '7 (2)' ) },
  { shortcut: '8', handler: yep ( '8 (2)' ) },
  { shortcut: '9', handler: yep ( '9 (2)' ) }
]);

shortcuts.remove ([
  { shortcut: '7', },
  { shortcut: '8', },
  { shortcut: '9', }
]);

shortcuts.register ([
  { shortcut: 'A', handler: yep ( 'A' ) },
  { shortcut: 'B', handler: yep ( 'B' ) },
  { shortcut: 'C', handler: yep ( 'C' ) },
  { shortcut: 'D', handler: yep ( 'D' ) },
  { shortcut: 'E', handler: yep ( 'E' ) },
  { shortcut: 'F', handler: yep ( 'F' ) },
  { shortcut: 'G', handler: yep ( 'G' ) },
  { shortcut: 'H', handler: yep ( 'H' ) },
  { shortcut: 'I', handler: yep ( 'I' ) },
  { shortcut: 'J', handler: yep ( 'J' ) },
  { shortcut: 'K', handler: yep ( 'K' ) },
  { shortcut: 'L', handler: yep ( 'L' ) },
  { shortcut: 'M', handler: yep ( 'M' ) },
  { shortcut: 'N', handler: yep ( 'N' ) },
  { shortcut: 'O', handler: yep ( 'O' ) },
  { shortcut: 'P', handler: yep ( 'P' ) },
  { shortcut: 'Q', handler: yep ( 'Q' ) },
  { shortcut: 'R', handler: yep ( 'R' ) },
  { shortcut: 'S', handler: yep ( 'S' ) },
  { shortcut: 'T', handler: yep ( 'T' ) },
  { shortcut: 'U', handler: yep ( 'U' ) },
  { shortcut: 'V', handler: yep ( 'V' ) },
  { shortcut: 'W', handler: yep ( 'W' ) },
  { shortcut: 'X', handler: yep ( 'X' ) },
  { shortcut: 'Y', handler: yep ( 'Y' ) },
  { shortcut: 'Z', handler: yep ( 'Z' ) },
]);

shortcuts.register ([
  { shortcut: 'F1', handler: yep ( 'F1' ) },
  { shortcut: 'F2', handler: yep ( 'F2' ) },
  { shortcut: 'F3', handler: yep ( 'F3' ) },
  { shortcut: 'F4', handler: yep ( 'F4' ) },
  { shortcut: 'F5', handler: yep ( 'F5' ) },
  { shortcut: 'F6', handler: yep ( 'F6' ) },
  { shortcut: 'F7', handler: yep ( 'F7' ) },
  { shortcut: 'F8', handler: yep ( 'F8' ) },
  { shortcut: 'F9', handler: yep ( 'F9' ) },
  { shortcut: 'F10', handler: yep ( 'F10' ) },
  { shortcut: 'F11', handler: yep ( 'F11' ) },
  { shortcut: 'F12', handler: yep ( 'F12' ) },
  { shortcut: 'F13', handler: yep ( 'F13' ) },
  { shortcut: 'F14', handler: yep ( 'F14' ) },
  { shortcut: 'F15', handler: yep ( 'F15' ) },
  { shortcut: 'F16', handler: yep ( 'F16' ) },
  { shortcut: 'F17', handler: yep ( 'F17' ) },
  { shortcut: 'F18', handler: yep ( 'F18' ) },
  { shortcut: 'F19', handler: yep ( 'F19' ) },
  { shortcut: 'F20', handler: yep ( 'F20' ) },
  { shortcut: 'F21', handler: yep ( 'F21' ) },
  { shortcut: 'F22', handler: yep ( 'F22' ) },
  { shortcut: 'F23', handler: yep ( 'F23' ) },
  { shortcut: 'F24', handler: yep ( 'F24' ) }
]);

shortcuts.register ([
  { shortcut: 'Numpad0', handler: yep ( 'Numpad0' ) },
  { shortcut: 'Numpad1', handler: yep ( 'Numpad1' ) },
  { shortcut: 'Numpad2', handler: yep ( 'Numpad2' ) },
  { shortcut: 'Numpad3', handler: yep ( 'Numpad3' ) },
  { shortcut: 'Numpad4', handler: yep ( 'Numpad4' ) },
  { shortcut: 'Numpad5', handler: yep ( 'Numpad5' ) },
  { shortcut: 'Numpad6', handler: yep ( 'Numpad6' ) },
  { shortcut: 'Numpad7', handler: yep ( 'Numpad7' ) },
  { shortcut: 'Numpad8', handler: yep ( 'Numpad8' ) },
  { shortcut: 'Numpad9', handler: yep ( 'Numpad9' ) }
]);

shortcuts.register ([
  { shortcut: 'NumpadAdd', handler: yep ( 'NumpadAdd' ) },
  { shortcut: 'NumpadComma', handler: yep ( 'NumpadComma' ) },
  { shortcut: 'NumpadDecimal', handler: yep ( 'NumpadDecimal' ) },
  { shortcut: 'NumpadDivide', handler: yep ( 'NumpadDivide' ) },
  { shortcut: 'NumpadEnter', handler: yep ( 'NumpadEnter' ) },
  { shortcut: 'NumpadEqual', handler: yep ( 'NumpadEqual' ) },
  { shortcut: 'NumpadMultiply', handler: yep ( 'NumpadMultiply' ) },
  { shortcut: 'NumpadSubtract', handler: yep ( 'NumpadSubtract' ) }
]);

shortcuts.register ([
  { shortcut: 'Left+Up', handler: nope ( 'Left+Up' ) },
  { shortcut: 'Right+Up', handler: nope ( 'Right+Up' ) },
  { shortcut: 'Left+Down', handler: nope ( 'Left+Down' ) },
  { shortcut: 'Right+Down', handler: nope ( 'Right+Down' ) },
  { shortcut: 'Left+Right', handler: nope ( 'Left+Right' ) },
  { shortcut: 'Up+Down', handler: nope ( 'Up+Down' ) }
]);

shortcuts.register ([
  { shortcut: 'Down', handler: yep ( 'Down' ) },
  { shortcut: 'Left', handler: yep ( 'Left' ) },
  { shortcut: 'Right', handler: yep ( 'Right' ) },
  { shortcut: 'Up', handler: yep ( 'Up' ) }
]);

shortcuts.register ([
  { shortcut: 'Backspace', handler: yep ( 'Backspace' ) },
  { shortcut: 'CapsLock', handler: yep ( 'CapsLock' ) },
  { shortcut: 'Delete', handler: yep ( 'Delete' ) },
  { shortcut: 'End', handler: yep ( 'End' ) },
  { shortcut: 'Enter', handler: yep ( 'Enter' ) },
  { shortcut: 'Escape', handler: yep ( 'Escape' ) },
  { shortcut: 'Home', handler: yep ( 'Home' ) },
  { shortcut: 'Insert', handler: yep ( 'Insert' ) },
  { shortcut: 'PageDown', handler: yep ( 'PageDown' ) },
  { shortcut: 'PageUp', handler: yep ( 'PageUp' ) },
  { shortcut: 'Space', handler: yep ( 'Space' ) },
  { shortcut: 'Tab', handler: yep ( 'Tab' ) }
]);

shortcuts.register ([
  { shortcut: 'NumLock', handler: yep ( 'NumLock' ) },
  { shortcut: 'ScrollLock', handler: yep ( 'ScrollLock' ) }
]);

shortcuts.register ([
  { shortcut: 'AltLeft', handler: nope ( 'AltLeft' ) },
  { shortcut: 'AltRight', handler: nope ( 'AltRight' ) },
  { shortcut: 'Alt', handler: nope ( 'Alt' ) },
  { shortcut: 'OptionLeft', handler: nope ( 'OptionLeft' ) },
  { shortcut: 'OptionRight', handler: nope ( 'OptionRight' ) },
  { shortcut: 'Option', handler: nope ( 'Option' ) },
  { shortcut: 'CmdLeft', handler: nope ( 'CmdLeft' ) },
  { shortcut: 'CmdRight', handler: nope ( 'CmdRight' ) },
  { shortcut: 'Cmd', handler: nope ( 'Cmd' ) },
  { shortcut: 'CommandLeft', handler: nope ( 'CommandLeft' ) },
  { shortcut: 'CommandRight', handler: nope ( 'CommandRight' ) },
  { shortcut: 'Command', handler: nope ( 'Command' ) },
  { shortcut: 'MetaLeft', handler: nope ( 'MetaLeft' ) },
  { shortcut: 'MetaRight', handler: nope ( 'MetaRight' ) },
  { shortcut: 'Meta', handler: nope ( 'Meta' ) },
  { shortcut: 'CtrlLeft', handler: nope ( 'CtrlLeft' ) },
  { shortcut: 'CtrlRight', handler: nope ( 'CtrlRight' ) },
  { shortcut: 'Ctrl', handler: nope ( 'Ctrl' ) },
  { shortcut: 'ControlLeft', handler: nope ( 'ControlLeft' ) },
  { shortcut: 'ControlRight', handler: nope ( 'ControlRight' ) },
  { shortcut: 'Control', handler: nope ( 'Control' ) },
  { shortcut: 'ShiftLeft', handler: nope ( 'ShiftLeft' ) },
  { shortcut: 'ShiftRight', handler: nope ( 'ShiftRight' ) },
  { shortcut: 'Shift', handler: nope ( 'Shift' ) },
  { shortcut: 'CmdLeftOrCtrlLeft', handler: nope ( 'CmdLeftOrCtrlLeft' ) },
  { shortcut: 'CmdRightOrCtrlRight', handler: nope ( 'CmdRightOrCtrlRight' ) },
  { shortcut: 'CmdOrCtrl', handler: nope ( 'CmdOrCtrl' ) },
  { shortcut: 'CommandLeftOrControlLeft', handler: nope ( 'CommandLeftOrControlLeft' ) },
  { shortcut: 'CommandRightOrControlRight', handler: nope ( 'CommandRightOrControlRight' ) },
  { shortcut: 'CommandOrControl', handler: nope ( 'CommandOrControl' ) }
]);

shortcuts.register ([
  { shortcut: '!', handler: nope ( 'ExclationMark' ) },
  { shortcut: '"', handler: nope ( 'DoubleQuote' ) },
  { shortcut: '#', handler: nope ( 'Hash' ) },
  { shortcut: '$', handler: nope ( 'Dollar' ) },
  { shortcut: '%', handler: nope ( 'Percent' ) },
  { shortcut: '&', handler: nope ( 'Ampersand' ) },
  { shortcut: '\'', handler: nope ( 'Quote' ) },
  { shortcut: '(', handler: nope ( 'ParenthesisLeft' ) },
  { shortcut: ')', handler: nope ( 'ParenthesisRight' ) },
  { shortcut: '*', handler: nope ( 'Asterisk' ) },
  { shortcut: '+', handler: nope ( 'Plus' ) },
  { shortcut: ',', handler: nope ( 'Comma' ) },
  { shortcut: '-', handler: nope ( 'Minus' ) },
  { shortcut: '.', handler: nope ( 'Period' ) },
  { shortcut: '/', handler: nope ( 'Slash' ) },
  { shortcut: ':', handler: nope ( 'Colon' ) },
  { shortcut: ';', handler: nope ( 'Semicolon' ) },
  { shortcut: '<', handler: nope ( 'LessThan' ) },
  { shortcut: '=', handler: nope ( 'Equal' ) },
  { shortcut: '>', handler: nope ( 'GreaterThan' ) },
  { shortcut: '?', handler: nope ( 'QuestionMark' ) },
  { shortcut: '@', handler: nope ( 'At' ) },
  { shortcut: '[', handler: nope ( 'BracketLeft' ) },
  { shortcut: '\\', handler: nope ( 'Backslash' ) },
  { shortcut: ']', handler: nope ( 'BracketRight' ) },
  { shortcut: '^', handler: nope ( 'Caret' ) },
  { shortcut: '_', handler: nope ( 'Underscore' ) },
  { shortcut: '`', handler: nope ( 'Backquote' ) },
  { shortcut: '{', handler: nope ( 'BraceLeft' ) },
  { shortcut: '|', handler: nope ( 'Pipe' ) },
  { shortcut: '}', handler: nope ( 'BraceRight' ) },
  { shortcut: '~', handler: nope ( 'Tilde' ) }
]);

shortcuts.register ([
  { shortcut: 'Shift+Plus', handler: nope ( 'Shift+Plus (Alias)' ) },
  { shortcut: 'Shift+!', handler: nope ( 'Shift+ExclationMark' ) },
  { shortcut: 'Shift+"', handler: nope ( 'Shift+DoubleQuote' ) },
  { shortcut: 'Shift+#', handler: nope ( 'Shift+Hash' ) },
  { shortcut: 'Shift+$', handler: nope ( 'Shift+Dollar' ) },
  { shortcut: 'Shift+%', handler: nope ( 'Shift+Percent' ) },
  { shortcut: 'Shift+&', handler: nope ( 'Shift+Ampersand' ) },
  { shortcut: 'Shift+\'', handler: nope ( 'Shift+Quote' ) },
  { shortcut: 'Shift+(', handler: nope ( 'Shift+ParenthesisLeft' ) },
  { shortcut: 'Shift+)', handler: nope ( 'Shift+ParenthesisRight' ) },
  { shortcut: 'Shift+*', handler: nope ( 'Shift+Asterisk' ) },
  { shortcut: 'Shift++', handler: nope ( 'Shift+Plus' ) },
  { shortcut: 'Shift+,', handler: nope ( 'Shift+Comma' ) },
  { shortcut: 'Shift+-', handler: nope ( 'Shift+Minus' ) },
  { shortcut: 'Shift+.', handler: nope ( 'Shift+Period' ) },
  { shortcut: 'Shift+/', handler: nope ( 'Shift+Slash' ) },
  { shortcut: 'Shift+:', handler: nope ( 'Shift+Colon' ) },
  { shortcut: 'Shift+;', handler: nope ( 'Shift+Semicolon' ) },
  { shortcut: 'Shift+<', handler: nope ( 'Shift+LessThan' ) },
  { shortcut: 'Shift+=', handler: nope ( 'Shift+Equal' ) },
  { shortcut: 'Shift+>', handler: nope ( 'Shift+GreaterThan' ) },
  { shortcut: 'Shift+?', handler: nope ( 'Shift+QuestionMark' ) },
  { shortcut: 'Shift+@', handler: nope ( 'Shift+At' ) },
  { shortcut: 'Shift+[', handler: nope ( 'Shift+BracketLeft' ) },
  { shortcut: 'Shift+\\', handler: nope ( 'Shift+Backslash' ) },
  { shortcut: 'Shift+]', handler: nope ( 'Shift+BracketRight' ) },
  { shortcut: 'Shift+^', handler: nope ( 'Shift+Caret' ) },
  { shortcut: 'Shift+_', handler: nope ( 'Shift+Underscore' ) },
  { shortcut: 'Shift+`', handler: nope ( 'Shift+Backquote' ) },
  { shortcut: 'Shift+{', handler: nope ( 'Shift+BraceLeft' ) },
  { shortcut: 'Shift+|', handler: nope ( 'Shift+Pipe' ) },
  { shortcut: 'Shift+}', handler: nope ( 'Shift+BraceRight' ) },
  { shortcut: 'Shift+~', handler: nope ( 'Shift+Tilde' ) }
]);

shortcuts.register ([
  { shortcut: 'Shift+1', handler: nope ( 'Shift+1' ) },
  { shortcut: 'Shift+2', handler: nope ( 'Shift+2' ) },
  { shortcut: 'Shift+3', handler: nope ( 'Shift+3' ) },
  { shortcut: 'Shift+4', handler: nope ( 'Shift+4' ) },
  { shortcut: 'Shift+5', handler: nope ( 'Shift+5' ) },
  { shortcut: 'Shift+6', handler: nope ( 'Shift+6' ) },
  { shortcut: 'Shift+7', handler: nope ( 'Shift+7' ) },
  { shortcut: 'Shift+8', handler: nope ( 'Shift+8' ) },
  { shortcut: 'Shift+9', handler: nope ( 'Shift+9' ) },
  { shortcut: 'Shift+0', handler: nope ( 'Shift+0' ) }
]);

shortcuts.register ([
  { shortcut: 'Shift+A', handler: nope ( 'Shift+A' ) },
  { shortcut: 'Shift+B', handler: nope ( 'Shift+B' ) },
  { shortcut: 'Shift+C', handler: nope ( 'Shift+C' ) },
  { shortcut: 'Shift+Z', handler: nope ( 'Shift+Z' ) },
  { shortcut: 'Shift+Y', handler: nope ( 'Shift+Y' ) },
  { shortcut: 'Shift+X', handler: nope ( 'Shift+X' ) }
]);

shortcuts.register ([
  { shortcut: 'ClickLeft', handler: nope ( 'ClickLeft' ) },
  { shortcut: 'ClickRight', handler: nope ( 'ClickRight' ) },
  { shortcut: 'ClickMiddle', handler: nope ( 'ClickMiddle' ) },
  { shortcut: 'MouseLeft', handler: nope ( 'MouseLeft' ) },
  { shortcut: 'MouseRight', handler: nope ( 'MouseRight' ) },
  { shortcut: 'MouseMiddle', handler: nope ( 'MouseMiddle' ) },
  { shortcut: 'Mouse0', handler: nope ( 'Mouse0' ) },
  { shortcut: 'Mouse1', handler: nope ( 'Mouse1' ) },
  { shortcut: 'Mouse2', handler: nope ( 'Mouse2' ) },
  { shortcut: 'Mouse3', handler: nope ( 'Mouse3' ) },
  { shortcut: 'Mouse4', handler: nope ( 'Mouse4' ) },
  { shortcut: 'Mouse5', handler: nope ( 'Mouse5' ) },
  { shortcut: 'Mouse6', handler: nope ( 'Mouse6' ) },
  { shortcut: 'Mouse7', handler: nope ( 'Mouse7' ) },
  { shortcut: 'Mouse8', handler: nope ( 'Mouse8' ) },
  { shortcut: 'Mouse9', handler: nope ( 'Mouse9' ) }
]);

shortcuts.register ([
  { shortcut: 'Alt+F', handler: yep ( 'Alt+F' ) },
  { shortcut: 'Cmd+K Cmd+A', handler: yep ( 'Cmd+K Cmd+A' ) },
  { shortcut: 'Cmd+K B', handler: yep ( 'Cmd+K B' ) },
  { shortcut: 'Cmd+K Alt+C', handler: yep ( 'Cmd+K Alt+C' ) },
  { shortcut: 'Shift+ClickLeft', handler: yep ( 'Shift+ClickLeft' ) },
  { shortcut: 'Cmd+ClickMiddle', handler: yep ( 'Cmd+ClickMiddle' ) },
  { shortcut: 'Alt+ClickLeft Cmd+ClickMiddle', handler: yep ( 'Alt+ClickLeft Cmd+ClickMiddle' ) }
]);

shortcuts.register ([
  { shortcut: 'CmdLeft+CmdRight', handler: yep ( 'CmdLeft+CmdRight' ) },
  // { shortcut: 'CmdLeft+CmdRight AltLeft+AltRight', handler: yep ( 'CmdLeft+CmdRight AltLeft+AltRight' ) } //TODO It'd be cool to support this too
]);

// shortcuts.register ( 'Up Up Down Down Left Right Left Right B A', yep ( 'Up Up Down Down Left Right Left Right B A 🚀' ), { konami: true } ); //TODO Maybe support this too

shortcuts.register ([
  { shortcut: 'Left+Up', handler: nope ( 'Left+Up' ) },
  { shortcut: 'Left+Down', handler: nope ( 'Left+Down' ) },
  { shortcut: 'Left+Right', handler: nope ( 'Left+Right' ) },
  { shortcut: 'Up+Down', handler: nope ( 'Up+Down' ) },
  { shortcut: 'Up+Right', handler: nope ( 'Up+Right' ) },
  { shortcut: 'Down+Right', handler: nope ( 'Down+Right' ) }
]);

shortcuts.register ( { shortcut: 'Ctrl+Cmd+Right', handler: yep ( 'Ctrl+Cmd+Right' ) } );

shortcuts.register ([
  { shortcut: '§', handler: yep ( '§' ) },
  { shortcut: '±', handler: yep ( '±' ) },
  { shortcut: 'Shift+§', handler: nope ( 'Shift+§' ) },
  { shortcut: 'Shift+±', handler: nope ( 'Shift+±' ) }
]);

shortcuts.register ( { shortcut: 'Ctrl+Cmd+A', handler: nope ( 'NOT DISPOSED!' ) } )();

shortcuts.start ();

// setTimeout ( () => {
//   shortcuts.stop ();
//   shortcuts.reset ();
// }, 5000 );

/* EXPORT */

globalThis.shortcuts = shortcuts;
globalThis.S = shortcuts;
