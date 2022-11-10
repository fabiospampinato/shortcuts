
/* MAIN */

const MODIFIER_KEY_BITMASK = 0b11111111_00000000; // Bitmask that includes all modifier keys and none of the triggers
const TRIGGER_KEY_BITMASK = 0b11111111; // Bitmask that includes all trigger keys and none of the modifiers

const PLUSES_RE = /\+{2,}/gi;
const WHITESPACE_RE = /\s+/gi;
const SHORTCUT_RE = /^\s*?(?:(?:^-?|\s|\+)(?:alt|option|cmd|command|meta|ctrl|control|shift|cmdorctrl|commandorcontrol|backspace|capslock|del|delete|down|end|enter|return|esc|escape|home|insert|left|pagedown|pageup|right|space|spacebar|tab|up|plus|\d|[a-z]|f(?:\d|1\d|2[0-4])|numpad\d|[!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-]))+\s*$/i; // Regex that matches a shortcut

const RESULT = <const> {
  HANDLED: 0, // An handler caught that
  UNHANDLED: 1, // No handler caught that, but maybe a deeper one could
  UNHANDLEABLE: 2 // No handler caught that, and there are no deeper handlers that could catch that
};

/* EXPORT */

export {MODIFIER_KEY_BITMASK, TRIGGER_KEY_BITMASK}
export {PLUSES_RE, WHITESPACE_RE, SHORTCUT_RE};
export {RESULT};
