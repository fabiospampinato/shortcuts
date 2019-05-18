
/* IMPORT */

import {ListenerResult} from './enums';
import {Shortcut as ShortcutType, ShortcutID, RecordHandler, ShortcutsOptions, ShortcutsTree, ShortcutDescriptor} from './types';
import Listener from './listener';
import Shortcut from './shortcut';

/* SHORTCUTS */

class Shortcuts {

  private listener: Listener;
  private shortcuts: ShortcutsTree;
  private recordHandler: RecordHandler;

  constructor ( options: ShortcutsOptions = {} ) {

    this.listener = new Listener ({
      handler: this.handler,
      target: options.target
    });

    this.reset ();

    if ( options.shortcuts ) {

      this.add ( options.shortcuts );

    }

  }

  private _updateListener () {

    const shouldListen = !!this.shortcuts.size;

    if ( shouldListen === this.listener.isListening () ) return;

    shouldListen ? this.listener.on () : this.listener.off ();

  }

  add ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] ) {

    if ( !( descriptors instanceof Array ) ) return this.add ([ descriptors ]);

    descriptors.forEach ( ({ shortcut, handler }) => {

      if ( shortcut[0] === '-' ) return this.remove ([{ shortcut, handler }]);

      if ( !handler ) return console.error ( `Can\'t add shortcut "${shortcut}" which has no handler` );

      const id = Shortcut.shortcut2id ( shortcut );

      // if ( !Shortcut.checkValidID ( id ) ) return; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

      const lastIndex = id.length - 1;

      id.reduce ( ( parent: ShortcutsTree, id, index ) => {

        if ( !parent[id] ) {

          parent.size++;

          parent[id] = {
            parent,
            id,
            size: 0,
            handlers: []
          };

        }

        if ( index === lastIndex ) {

          parent[id].handlers.unshift ( handler );

        }

        return parent[id];

      }, this.shortcuts );

    });

    this._updateListener ();

  }

  remove ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] ) {

    if ( !( descriptors instanceof Array ) ) return this.remove ([ descriptors ]);

    descriptors.forEach ( ({ shortcut, handler }) => {

      if ( shortcut[0] === '-' ) shortcut = shortcut.slice ( 1 );

      const id = Shortcut.shortcut2id ( shortcut );

      // if ( !Shortcut.checkValidID ( id ) ) return; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

      const lastIndex = id.length - 1;

      id.reduce ( ( parent: ShortcutsTree, id, index ) => {

        const child = parent[id];

        if ( !child ) return {};

        if ( index === lastIndex ) {

          if ( handler ) {

            child.handlers = child.handlers.filter ( h => h != handler );

          } else {

            child.handlers.length = 0;

          }

          let target = child;

          while ( !target.size && !target.handlers.length && target.parent && target.id ) { // Cleaning up

            delete target.parent[target.id];

            target.parent.size--;

            target = target.parent;

          }

        }

        return child;

      }, this.shortcuts );


    });

    this._updateListener ();

  }

  reset () {

    this.shortcuts = {
      size: 0,
      handlers: []
    };

    this._updateListener ();

  }

  record ( handler: RecordHandler ): Function {

    this.recordHandler = handler;

    return () => delete this.recordHandler;

  }

  trigger ( shortcut: ShortcutType | ShortcutID ): boolean {

    const id = typeof shortcut === 'string' ? Shortcut.shortcut2id ( shortcut ) : shortcut;

    // if ( !Shortcut.checkValidID ( id ) ) return ListenerResult.UNHANDLEABLE; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

    return this.handler ( id ) === ListenerResult.HANDLED;

  }

  private handler = ( id: ShortcutID, event?: KeyboardEvent ): ListenerResult | ShortcutID => {

    if ( this.recordHandler ) { // Recording

      this.recordHandler ( Shortcut.id2accelerator ( id ) );

      return ListenerResult.UNHANDLED;

    }

    let handleable = false,
        firstHandleableIndex = -1;

    outer:
    for ( let i = 0, l = id.length; i < l; i++ ) { // Trying all possible combinations (e.g 'A B C' => ['A B C', 'B C ', 'C'])

      let target = this.shortcuts;

      for ( let ci = i; ci < l; ci++ ) { // Getting all chords in the current combination

        target = target[id[ci]];

        if ( !target ) {

          if ( !handleable && i === ( l - 1 ) ) return ListenerResult.UNHANDLEABLE; // Can't be handled by any deeper shortcuts

          continue outer;

        }

      }

      handleable = true;

      if ( firstHandleableIndex === -1 ) firstHandleableIndex = i;

      const {handlers} = target;

      for ( let hi = 0, hl = handlers.length; hi < hl; hi++ ) {

        if ( handlers[hi]( event ) === true ) { // Handled, stopping here

          if ( event ) {

            event.preventDefault ();
            event.stopPropagation ();

          }

          return ListenerResult.HANDLED;

        }

      }

    }

    if ( firstHandleableIndex > 0 ) return id.slice ( firstHandleableIndex ); // Simplifying the shortcut, no point in checking unhandleable combinations

    return ListenerResult.UNHANDLED;

  }

}

/* EXPORT */

export default Shortcuts;
