
/* IMPORT */

import Utils from './utils';

/* MAIN */

const KEY2ID = <const> { // Map of lowercased supported characters to their internal id number
  /* MODIFIERS */
  alt: 0b1_00000000,
  option: 0b1_00000000,
  cmd: 0b10_00000000,
  command: 0b10_00000000,
  meta: 0b10_00000000,
  ctrl: 0b100_00000000,
  control: 0b100_00000000,
  shift: 0b1000_00000000,
  cmdorctrl: Utils.isMac () ? 0b10_00000000 : 0b100_00000000,
  commandorcontrol: Utils.isMac () ? 0b10_00000000 : 0b100_00000000,
  /* SPECIAL CHARACTERS */
  backspace: 1,
  capslock: 2,
  del: 3,
  delete: 3,
  down: 4,
  end: 5,
  enter: 6,
  return: 6,
  esc: 7,
  escape: 7,
  home: 8,
  insert: 9,
  left: 10,
  pagedown: 11,
  pageup: 12,
  right: 13,
  space: 14,
  spacebar: 14,
  tab: 15,
  up: 16,
  /* DIGITS */
  0: 17,
  1: 18,
  2: 19,
  3: 20,
  4: 21,
  5: 22,
  6: 23,
  7: 24,
  8: 25,
  9: 26,
  /* ALPHABET */
  a: 27,
  b: 28,
  c: 29,
  d: 30,
  e: 31,
  f: 32,
  g: 33,
  h: 34,
  i: 35,
  j: 36,
  k: 37,
  l: 38,
  m: 39,
  n: 40,
  o: 41,
  p: 42,
  q: 43,
  r: 44,
  s: 45,
  t: 46,
  u: 47,
  v: 48,
  w: 49,
  x: 50,
  y: 51,
  z: 52,
  /* PUNCTUATION */
  '!': 53,
  '"': 54,
  '#': 55,
  '$': 56,
  '%': 57,
  '&': 58,
  '\'': 59,
  '(': 60,
  ')': 61,
  '*': 62,
  '+': 63,
  plus: 63,
  ',': 64,
  '-': 65,
  '.': 66,
  '/': 67,
  ':': 68,
  ';': 69,
  '<': 70,
  '=': 71,
  '>': 72,
  '?': 73,
  '@': 74,
  '[': 75,
  '\\': 76,
  ']': 77,
  '^': 78,
  '_': 79,
  '`': 80,
  '{': 81,
  '|': 82,
  '}': 83,
  '~': 84,
  /* FUNCTION KEYS */
  f1: 85,
  f2: 86,
  f3: 87,
  f4: 88,
  f5: 89,
  f6: 90,
  f7: 91,
  f8: 92,
  f9: 93,
  f10: 94,
  f11: 95,
  f12: 96,
  f13: 97,
  f14: 98,
  f15: 99,
  f16: 100,
  f17: 101,
  f18: 102,
  f19: 103,
  f20: 104,
  f21: 105,
  f22: 106,
  f23: 107,
  f24: 108,
  /* NUMPAD DIGITS */
  numpad0: 109,
  numpad1: 110,
  numpad2: 111,
  numpad3: 112,
  numpad4: 113,
  numpad5: 114,
  numpad6: 115,
  numpad7: 116,
  numpad8: 117,
  numpad9: 118
};

const CODE2ID = <const> { // Map of supported key code to their internal id number //URL: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
  /* MODIFIERS */
  18: 0b1_00000000, // alt
  91: 0b10_00000000, // cmd (OSLeft)
  92: 0b10_00000000, // cmd (OSRight)
  93: 0b10_00000000, // cmd (OSRight)
  224: 0b10_00000000, // cmd (OSLeft/OSRight)
  17: 0b100_00000000, // ctrl
  16: 0b1000_00000000, // shift
  /* SPECIAL CHARACTERS */
  8: 1, // backspace
  20: 2, // capslock
  46: 3, // delete
  40: 4, // down
  35: 5, // end
  13: 6, // return
  27: 7, // escape
  36: 8, // home
  45: 9, // insert
  37: 10, // left
  34: 11, // pagedown
  33: 12, // pageup
  39: 13, // right
  32: 14, // space
  9: 15, // tab
  38: 16, // up
  /* PUNCTUATION */ // Ensuring Shift+Punctuation works more reliably
  222: 59, // '
  188: 64, // ,
  189: 65, // -
  190: 66, // .
  191: 67, // /
  186: 69, // ;
  187: 71, // =
  219: 75, // [
  220: 76, // \
  221: 77, // ]
  192: 80, // `
  /* FUNCTION KEYS */
  112: 85, // f1
  113: 86, // f2
  114: 87, // f3
  115: 88, // f4
  116: 89, // f5
  117: 90, // f6
  118: 91, // f7
  119: 92, // f8
  120: 93, // f9
  121: 94, // f10
  122: 95, // f11
  123: 96, // f12
  124: 97, // f13
  125: 98, // f14
  126: 99, // f15
  127: 100, // f16
  128: 101, // f17
  129: 102, // f18
  130: 103, // f19
  131: 104, // f20
  132: 105, // f21
  133: 106, // f22
  134: 107, // f23
  135: 108, // f24
  /* NUMPAD DIGITS */
  96: 109, // numpad0
  97: 110, // numpad1
  98: 111, // numpad2
  99: 112, // numpad3
  100: 113, // numpad4
  101: 114, // numpad5
  102: 115, // numpad6
  103: 116, // numpad7
  104: 117, // numpad8
  105: 118 // numpad9
};

const ID2SHORTCUT = <const> { // Map of id numbers to their shortcut string
  /* MODIFIERS */
  0b1_00000000: 'Alt',
  0b10_00000000: 'Cmd',
  0b100_00000000: 'Ctrl',
  0b1000_00000000: 'Shift',
  /* SPECIAL CHARACTERS */
  1: 'Backspace',
  2: 'Capslock',
  3: 'Delete',
  4: 'Down',
  5: 'End',
  6: 'Enter',
  7: 'Escape',
  8: 'Home',
  9: 'Insert',
  10: 'Left',
  11: 'PageDown',
  12: 'PageUp',
  13: 'Right',
  14: 'Space',
  15: 'Tab',
  16: 'Up',
  /* DIGITS */
  17: '0',
  18: '1',
  19: '2',
  20: '3',
  21: '4',
  22: '5',
  23: '6',
  24: '7',
  25: '8',
  26: '9',
  /* ALPHABET */
  27: 'A',
  28: 'B',
  29: 'C',
  30: 'D',
  31: 'E',
  32: 'F',
  33: 'G',
  34: 'H',
  35: 'I',
  36: 'J',
  37: 'K',
  38: 'L',
  39: 'M',
  40: 'N',
  41: 'O',
  42: 'P',
  43: 'Q',
  44: 'R',
  45: 'S',
  46: 'T',
  47: 'U',
  48: 'V',
  49: 'W',
  50: 'X',
  51: 'Y',
  52: 'Z',
  /* PUNCTUATION */
  53: '!',
  54: '"',
  55: '#',
  56: '$',
  57: '%',
  58: '&',
  59: '\'',
  60: '(',
  61: ')',
  62: '*',
  63: 'Plus',
  64: ',',
  65: '-',
  66: '.',
  67: '/',
  68: ':',
  69: ';',
  70: '<',
  71: '=',
  72: '>',
  73: '?',
  74: '@',
  75: '[',
  76: '\\',
  77: ']',
  78: '^',
  79: '_',
  80: '`',
  81: '{',
  82: '|',
  83: '}',
  84: '~',
  /* FUNCTION KEYS */
  85: 'F1',
  86: 'F2',
  87: 'F3',
  88: 'F4',
  89: 'F5',
  90: 'F6',
  91: 'F7',
  92: 'F8',
  93: 'F9',
  94: 'F10',
  95: 'F11',
  96: 'F12',
  97: 'F13',
  98: 'F14',
  99: 'F15',
  100: 'F16',
  101: 'F17',
  102: 'F18',
  103: 'F19',
  104: 'F20',
  105: 'F21',
  106: 'F22',
  107: 'F23',
  108: 'F24',
  /* NUMPAD DIGITS */
  109: 'Numpad0',
  110: 'Numpad1',
  111: 'Numpad2',
  112: 'Numpad3',
  113: 'Numpad4',
  114: 'Numpad5',
  115: 'Numpad6',
  116: 'Numpad7',
  117: 'Numpad8',
  118: 'Numpad9'
};

const ID2ACCELERATOR = <const> { // Map of id numbers to their Electron's accelerator representation
  /* MODIFIERS */
  0b1_00000000: 'Alt',
  0b10_00000000: 'Cmd',
  0b100_00000000: 'Ctrl',
  0b1000_00000000: 'Shift',
  /* SPECIAL CHARACTERS */
  1: 'Backspace',
  2: 'Capslock',
  3: 'Delete',
  4: 'Down',
  5: 'End',
  6: 'Enter',
  7: 'Escape',
  8: 'Home',
  9: 'Insert',
  10: 'Left',
  11: 'PageDown',
  12: 'PageUp',
  13: 'Right',
  14: 'Space',
  15: 'Tab',
  16: 'Up',
  /* DIGITS */
  17: '0',
  18: '1',
  19: '2',
  20: '3',
  21: '4',
  22: '5',
  23: '6',
  24: '7',
  25: '8',
  26: '9',
  /* ALPHABET */
  27: 'A',
  28: 'B',
  29: 'C',
  30: 'D',
  31: 'E',
  32: 'F',
  33: 'G',
  34: 'H',
  35: 'I',
  36: 'J',
  37: 'K',
  38: 'L',
  39: 'M',
  40: 'N',
  41: 'O',
  42: 'P',
  43: 'Q',
  44: 'R',
  45: 'S',
  46: 'T',
  47: 'U',
  48: 'V',
  49: 'W',
  50: 'X',
  51: 'Y',
  52: 'Z',
  /* PUNCTUATION */
  53: '!',
  54: '"',
  55: '#',
  56: '$',
  57: '%',
  58: '&',
  59: '\'',
  60: '(',
  61: ')',
  62: '*',
  63: 'Plus',
  64: ',',
  65: '-',
  66: '.',
  67: '/',
  68: ':',
  69: ';',
  70: '<',
  71: '=',
  72: '>',
  73: '?',
  74: '@',
  75: '[',
  76: '\\',
  77: ']',
  78: '^',
  79: '_',
  80: '`',
  81: '{',
  82: '|',
  83: '}',
  84: '~',
  /* FUNCTION KEYS */
  85: 'F1',
  86: 'F2',
  87: 'F3',
  88: 'F4',
  89: 'F5',
  90: 'F6',
  91: 'F7',
  92: 'F8',
  93: 'F9',
  94: 'F10',
  95: 'F11',
  96: 'F12',
  97: 'F13',
  98: 'F14',
  99: 'F15',
  100: 'F16',
  101: 'F17',
  102: 'F18',
  103: 'F19',
  104: 'F20',
  105: 'F21',
  106: 'F22',
  107: 'F23',
  108: 'F24',
  /* NUMPAD DIGITS */
  109: 'num0',
  110: 'num1',
  111: 'num2',
  112: 'num3',
  113: 'num4',
  114: 'num5',
  115: 'num6',
  116: 'num7',
  117: 'num8',
  118: 'num9'
};

const ID2SYMBOL = <const> { // Map of id numbers to their symbol representation
  /* MODIFIERS */
  0b1_00000000: '⌥', // alt
  0b10_00000000: '⌘', // cmd
  0b100_00000000: '⌃', // ctrl
  0b1000_00000000: '⇧', // shift
  /* SPECIAL CHARACTERS */
  1: '⌫', // backspace
  2: '⇪', // capslock
  3: '⌦', // delete
  4: '↓', // down
  5: '↘', // end
  6: '⏎', // enter
  7: '⎋', // escape
  8: '↖', // home
  9: '⎀', // insert
  10: '←', // left
  11: '⇟', // pagedown
  12: '⇞', // pageup
  13: '→', // right
  14: '␣', // space
  15: '⇥', // tab
  16: '↑', // up
  /* DIGITS */
  17: '0', // 0
  18: '1', // 1
  19: '2', // 2
  20: '3', // 3
  21: '4', // 4
  22: '5', // 5
  23: '6', // 6
  24: '7', // 7
  25: '8', // 8
  26: '9', // 9
  /* ALPHABET */
  27: 'A', // a
  28: 'B', // b
  29: 'C', // c
  30: 'D', // d
  31: 'E', // e
  32: 'F', // f
  33: 'G', // g
  34: 'H', // h
  35: 'I', // i
  36: 'J', // j
  37: 'K', // k
  38: 'L', // l
  39: 'M', // m
  40: 'N', // n
  41: 'O', // o
  42: 'P', // p
  43: 'Q', // q
  44: 'R', // r
  45: 'S', // s
  46: 'T', // t
  47: 'U', // u
  48: 'V', // v
  49: 'W', // w
  50: 'X', // x
  51: 'Y', // y
  52: 'Z', // z
  /* PUNCTUATION */
  53: '!', // !
  54: '"', // "
  55: '#', // #
  56: '$', // $
  57: '%', // %
  58: '&', // &
  59: '\'', // '
  60: '(', // (
  61: ')', // )
  62: '*', // *
  63: '+', // plus
  64: ',', // ,
  65: '-', // -
  66: '.', // .
  67: '/', // /
  68: ':', // :
  69: ';', // ;
  70: '<', // <
  71: '=', // =
  72: '>', // >
  73: '?', // ?
  74: '@', // @
  75: '[', // [
  76: '\\', // \
  77: ']', // ]
  78: '^', // ^
  79: '_', // _
  80: '`', // `
  81: '{', // {
  82: '|', // |
  83: '}', // }
  84: '~', // ~
  /* FUNCTION KEYS */
  85: 'F1', // f1
  86: 'F2', // f2
  87: 'F3', // f3
  88: 'F4', // f4
  89: 'F5', // f5
  90: 'F6', // f6
  91: 'F7', // f7
  92: 'F8', // f8
  93: 'F9', // f9
  94: 'F10', // f10
  95: 'F11', // f11
  96: 'F12', // f12
  97: 'F13', // f13
  98: 'F14', // f14
  99: 'F15', // f15
  100: 'F16', // f16
  101: 'F17', // f17
  102: 'F18', // f18
  103: 'F19', // f19
  104: 'F20', // f20
  105: 'F21', // f21
  106: 'F22', // f22
  107: 'F23', // f23
  108: 'F24', // f24
  /* NUMPAD DIGITS */
  109: 'Numpad0', // numpad0
  110: 'Numpad1', // numpad1
  111: 'Numpad2', // numpad2
  112: 'Numpad3', // numpad3
  113: 'Numpad4', // numpad4
  114: 'Numpad5', // numpad5
  115: 'Numpad6', // numpad6
  116: 'Numpad7', // numpad7
  117: 'Numpad8', // numpad8
  118: 'Numpad9' // numpad9
};

/* EXPORT */

export {KEY2ID, CODE2ID, ID2SHORTCUT, ID2ACCELERATOR, ID2SYMBOL};
