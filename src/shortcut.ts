
/* IMPORT */

import {MODIFIER_KEY_BITMASK, TRIGGER_KEY_BITMASK} from './constants';
import {PLUSES_RE, WHITESPACE_RE, SHORTCUT_RE} from './constants';
import {KEY2ID, CODE2ID, ID2SHORTCUT, ID2ACCELERATOR, ID2SYMBOL} from './maps';
import Utils from './utils';
import type {Chord, ChordID, Shortcut as ShortcutType, ShortcutID} from './types';

/* MAIN */

const Shortcut = {

  /* MODIFIER KEY */

  getModifierKey: ( id: ChordID ): ChordID => {

    return id & MODIFIER_KEY_BITMASK ;

  },

  hasModifierKey: ( id: ChordID ): boolean => {

    return !!Shortcut.getModifierKey ( id );

  },

  /* TRIGGER KEY */

  getTriggerKey: ( id: ChordID ): ChordID => {

    return id & TRIGGER_KEY_BITMASK;

  },

  hasTriggerKey: ( id: ChordID ): boolean => {

    return !!Shortcut.getTriggerKey ( id );

  },

  /* EVENT */

  event2id: ( event: MouseEvent | KeyboardEvent ): ChordID => {

    let id = 0;

    /* TRIGGER */

    if ( Utils.isKeyboardEvent ( event ) ) {

      const isKeypress = ( event.type === 'keypress' );
      const code = event.which || event.keyCode || 0;
      const char = String.fromCharCode ( code ).toLowerCase ();
      const key = event.key;

      id = isKeypress ? KEY2ID[key] || KEY2ID[char] || 0 : CODE2ID[code] || KEY2ID[char] || KEY2ID[key] || 0;

    }

    /* MODIFIERS */

    if ( event.ctrlKey ) id |= KEY2ID.ctrl;
    if ( event.altKey ) id |= KEY2ID.alt;
    if ( event.shiftKey ) id |= KEY2ID.shift;
    if ( event.metaKey ) id |= KEY2ID.cmd;

    return id;

  },

  event2shortcut: ( event: MouseEvent | KeyboardEvent ): ShortcutType => {

    return Shortcut.id2shortcut ([ Shortcut.event2id ( event ) ]);

  },

  event2accelerator: ( event: MouseEvent | KeyboardEvent ): string => {

    return Shortcut.id2accelerator ([ Shortcut.event2id ( event ) ]);

  },

  event2symbols: ( event: MouseEvent | KeyboardEvent ): string => {

    return Shortcut.id2symbols ([ Shortcut.event2id ( event ) ]);

  },

  /* CHORD */

  chord2id: Utils.memoize ( ( chord: Chord ): ChordID => {

    const keys = chord.replace ( PLUSES_RE, '+Plus' ).toLowerCase ().split ( '+' );

    return keys.reduce ( ( keyCode, key ) => {

      return keyCode | ( KEY2ID[key] || 0 );

    }, 0 );

  }),

  chord2accelerator: ( chord: Chord ): string => {

    return Shortcut.id2accelerator ([ Shortcut.chord2id ( chord ) ]);

  },

  chord2symbols: ( chord: Chord ): string => {

    return Shortcut.id2symbols ([ Shortcut.chord2id ( chord ) ]);

  },

  /* SHORTCUT */

  isValidShortcut: ( shortcut: ShortcutType ): boolean => {

    return SHORTCUT_RE.test ( shortcut );

  },

  checkValidShortcut: ( shortcut: ShortcutType ): boolean => {

    const isValid = Shortcut.isValidShortcut ( shortcut );

    if ( !isValid ) console.error ( `Invalid shortcut: "${shortcut}"` );

    return isValid;

  },

  shortcut2id: Utils.memoize ( ( shortcut: ShortcutType ): ShortcutID => {

    const chords = shortcut.trim ().split ( WHITESPACE_RE );

    return chords.map ( Shortcut.chord2id );

  }),

  shortcut2accelerator: Utils.memoize ( ( shortcut: ShortcutType ): string => {

    return Shortcut.id2accelerator ( Shortcut.shortcut2id ( shortcut ) );

  }),

  shortcut2symbols: Utils.memoize ( ( shortcut: ShortcutType ): string => {

    return Shortcut.id2symbols ( Shortcut.shortcut2id ( shortcut ) );

  }),

  /* ID */

  isValidID: ( id: ShortcutID ): boolean => {

    return id.every ( Utils.isTruthy );

  },

  checkValidID: ( id: ShortcutID ): boolean => {

    const isValid = Shortcut.isValidID ( id );

    if ( !isValid ) console.error ( `Invalid shortcut: "${Shortcut.id2accelerator ( id )}"` );

    return isValid;

  },

  id2output: ( id: ShortcutID, idMap: Record<number, string>, chordSeparator: string, sequenceSeparator: string ): string => {

    const {ctrl, alt, shift, cmd} = KEY2ID;

    return id.map ( id => {

      const keys: string[] = [];

      if ( id & ctrl ) keys.push ( idMap[ctrl] );
      if ( id & alt ) keys.push ( idMap[alt] );
      if ( id & shift ) keys.push ( idMap[shift] );
      if ( id & cmd ) keys.push ( idMap[cmd] );

      const triggerKey = Shortcut.getTriggerKey ( id );

      if ( triggerKey ) keys.push ( idMap[triggerKey] || String.fromCharCode ( triggerKey ).toUpperCase () );

      return keys.join ( chordSeparator );

    }).join ( sequenceSeparator );

  },

  id2shortcut: ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, ID2SHORTCUT, '+', ' ' );

  },

  id2accelerator: ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, ID2ACCELERATOR, '+', ' ' );

  },

  id2symbols: ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, ID2SYMBOL, '', ' ' );

  }

};

/* EXPORT */

export default Shortcut;
