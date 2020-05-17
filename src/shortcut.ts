
/* IMPORT */

import {Chord, ChordID, Shortcut, ShortcutID} from './types';
import Consts from './consts';
import Utils from './utils';

/* SHORTCUT */

const Shortcut = {

  /* MODIFIER KEY */

  getModifierKey: ( id: ChordID ): ChordID => {

    return Consts.modifierKeyBitmask & id;

  },

  hasModifierKey: ( id: ChordID ): boolean => {

    return !!Shortcut.getModifierKey ( id );

  },

  /* TRIGGER KEY */

  getTriggerKey: ( id: ChordID ): ChordID => {

    return Consts.triggerKeyBitmask & id;

  },

  hasTriggerKey: ( id: ChordID ): boolean => {

    return !!Shortcut.getTriggerKey ( id );

  },

  /* EVENT */

  event2id: ( event: KeyboardEvent ): ChordID => {

    /* TRIGGER */

    const isKeypress = ( event.type === 'keypress' ),
          code = event.which || event.keyCode,
          char = String.fromCharCode ( code ).toLowerCase (),
          key = event.key;

    let id = isKeypress ? Consts.key2id[key] || Consts.key2id[char] || 0 : Consts.code2id[code] || Consts.key2id[char] || Consts.key2id[key] || 0;

    /* MODIFIERS */

    if ( event.ctrlKey ) id |= Consts.key2id.ctrl;
    if ( event.altKey ) id |= Consts.key2id.alt;
    if ( event.shiftKey ) id |= Consts.key2id.shift;
    if ( event.metaKey ) id |= Consts.key2id.cmd;

    return id;

  },

  event2shortcut: ( event: KeyboardEvent ): Shortcut => {

    return Shortcut.id2shortcut ([ Shortcut.event2id ( event ) ]);

  },

  event2accelerator: ( event: KeyboardEvent ): string => {

    return Shortcut.id2accelerator ([ Shortcut.event2id ( event ) ]);

  },

  event2symbols: ( event: KeyboardEvent ): string => {

    return Shortcut.id2symbols ([ Shortcut.event2id ( event ) ]);

  },

  /* CHORD */

  chord2id: Utils.memoize ( ( chord: Chord ): ChordID => {

    const keys = chord.replace ( Utils.plusesRe, '+Plus' ).toLowerCase ().split ( '+' );

    return keys.reduce ( ( keyCode, key ) => {
      return keyCode | ( Consts.key2id[key] || 0 );
    }, 0 );

  }),

  chord2accelerator: ( chord: Chord ): string => {

    return Shortcut.id2accelerator ([ Shortcut.chord2id ( chord ) ]);

  },

  chord2symbols: ( chord: Chord ): string => {

    return Shortcut.id2symbols ([ Shortcut.chord2id ( chord ) ]);

  },

  /* SHORTCUT */

  shortcut2id: Utils.memoize ( ( shortcut: Shortcut ): ShortcutID => {

    const chords = shortcut.split ( Utils.whitespaceRe );

    return chords.map ( Shortcut.chord2id );

  }),

  shortcut2accelerator: Utils.memoize ( ( shortcut: Shortcut ): string => {

    return Shortcut.id2accelerator ( Shortcut.shortcut2id ( shortcut ) );

  }),

  shortcut2symbols: Utils.memoize ( ( shortcut: Shortcut ): string => {

    return Shortcut.id2symbols ( Shortcut.shortcut2id ( shortcut ) );

  }),

  /* ID */

  isValidID: ( id: ShortcutID ): boolean => {

    return id.find ( id => !id ) === undefined;

  },

  checkValidID: ( id: ShortcutID ): boolean => {

    const isValid = Shortcut.isValidID ( id );

    if ( !isValid ) console.error ( `Invalid shortcut: "${Shortcut.id2accelerator ( id )}"` );;

    return isValid;

  },

  id2output: ( id: ShortcutID, outputMap = {}, chordSeparator = '+', sequenceSeparator = ' ' ): string => {

    const {ctrl, alt, shift, cmd} = Consts.key2id;

    return id.map ( id => {

      const keys: string[] = [];

      if ( ctrl & id ) keys.push ( outputMap[ctrl] );
      if ( alt & id ) keys.push ( outputMap[alt] );
      if ( shift & id ) keys.push ( outputMap[shift] );
      if ( cmd & id ) keys.push ( outputMap[cmd] );

      const triggerKey = Shortcut.getTriggerKey ( id );

      if ( triggerKey ) keys.push ( outputMap[triggerKey] || String.fromCharCode ( triggerKey ).toUpperCase () );

      return keys.join ( chordSeparator );

    }).join ( sequenceSeparator );

  },

  id2shortcut: Utils.memoize ( ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, Consts.id2shortcut );

  }),

  id2accelerator: Utils.memoize ( ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, Consts.id2accelerator );

  }),

  id2symbols: Utils.memoize ( ( id: ShortcutID ): string => {

    return Shortcut.id2output ( id, Consts.id2symbol, '' );

  })

};

/* EXPORT */

export default Shortcut;
