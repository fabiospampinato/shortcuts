
const Consts = require ( '../dist/consts' ).default;
const {Shortcut} = require ( '../dist' );

const Utils = {

  getShortcutsNr ( Shortcuts ) {

    function getNr ( target ) {

      let nr = target.handlers.length;

      Object.keys ( target ).map ( key => {

        if ( Number ( key ) != key ) return;

        if ( target[key].handlers ) nr += getNr ( target[key] );

      });

      return nr;

    }

    return getNr ( Shortcuts.shortcuts );

  },

  triggerShortcutEvent ( shortcut, type ) {

    const id = Shortcut.shortcut2id ( shortcut );

    id.forEach ( id => {

      const trigger = Shortcut.getTriggerKey ( id ),
            {ctrl, alt, shift, cmd} = Consts.key2id;

      const event = new KeyboardEvent ( type, {
        bubbles: true,
        cancelable: true,
        key: Shortcut.id2accelerator ( [trigger] ),
        keyCode: Shortcut.id2accelerator ( [trigger] ).charCodeAt ( 0 ),
        ctrlKey: !!( ctrl & id ),
        altKey: !!( alt & id ),
        shiftKey: !!( shift & id ),
        metaKey: !!( cmd & id )
      });

      document.dispatchEvent ( event );

    });

  }

};

module.exports = Utils;
