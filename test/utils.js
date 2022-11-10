
/* IMPORT */

import {EventEmitter} from 'node:events';
import {KEY2ID} from '../dist/maps.js';
import {Shortcut} from '../dist/index.js';

/* MAIN */

const Emitter = (() => {

  const emitter = new EventEmitter ();

  return {
    addEventListener: ( name, listener ) => {
      emitter.addListener ( name, listener );
    },
    removeEventListener: ( name, listener ) => {
      emitter.removeListener ( name, listener );
    },
    dispatchEvent: ( event ) => {
      emitter.emit ( event.type, event );
    }
  };

})();

const getShortcutsNr = ( Shortcuts ) => {

  const getNr = ( target ) => {

    let nr = target.handlers.length;

    Object.keys ( target ).map ( key => {

      if ( Number ( key ) != key ) return;

      if ( !target[key].handlers ) return;

      nr += getNr ( target[key] );

    });

    return nr;

  }

  return getNr ( Shortcuts.shortcuts );

};

const triggerShortcutEvent = ( shortcut, type ) => {

  const id = Shortcut.shortcut2id ( shortcut );

  id.forEach ( id => {

    const trigger = Shortcut.getTriggerKey ( id );
    const {ctrl, alt, shift, cmd} = KEY2ID;

    const event = {
      type,
      bubbles: true,
      cancelable: true,
      key: Shortcut.id2accelerator ( [trigger] ),
      keyCode: Shortcut.id2accelerator ( [trigger] ).charCodeAt ( 0 ),
      ctrlKey: !!( ctrl & id ),
      altKey: !!( alt & id ),
      shiftKey: !!( shift & id ),
      metaKey: !!( cmd & id ),
      preventDefault: () => {},
      stopPropagation: () => {}
    };

    Emitter.dispatchEvent ( event );

  });

};

/* EXPORT */

export {Emitter, getShortcutsNr, triggerShortcutEvent};
