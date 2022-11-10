
/* IMPORT */

import {RESULT} from './constants';
import Listener from './listener';
import Shortcut from './shortcut';
import Utils from './utils';
import type {Shortcut as ShortcutType, ShortcutID, Disposer, RecordHandler, ShortcutsOptions, ShortcutsTree, ShortcutDescriptor} from './types';

/* MAIN */

class Shortcuts {

  /* VARIABLES */

  private listener: Listener;
  private descriptors: ShortcutDescriptor[] = []; //TODO: Implement this more efficiently, possibly reusing the ShortcutsTree structure we already have
  private shortcuts: ShortcutsTree = { size: 0, handlers: [] };
  private recordHandler?: RecordHandler;

  /* CONSTRUCTOR */

  constructor ( options: ShortcutsOptions = {} ) {

    this.listener = new Listener ({
      capture: options.capture,
      handler: this.handler,
      target: options.target,
      shouldHandleEvent: options.shouldHandleEvent
    });

    this.reset ();

    if ( options.shortcuts ) {

      this.add ( options.shortcuts );

    }

  }

  /* PRIVATE API */

  private _updateListener = (): void => {

    const shouldListen = !!this.shortcuts.size;

    if ( shouldListen === this.listener.isListening () ) return;

    shouldListen ? this.listener.on () : this.listener.off ();

  };

  private handler = ( id: ShortcutID, event?: KeyboardEvent ): 0 | 1 | 2 | ShortcutID => {

    if ( this.recordHandler ) { // Recording

      this.recordHandler ( Shortcut.id2accelerator ( id ) );

      return RESULT.UNHANDLED;

    }

    let handleable = false;
    let firstHandleableIndex = -1;

    outer:
    for ( let i = 0, l = id.length; i < l; i++ ) { // Trying all possible combinations (e.g 'A B C' => ['A B C', 'B C ', 'C'])

      let target = this.shortcuts;

      for ( let ci = i; ci < l; ci++ ) { // Getting all chords in the current combination

        target = target[id[ci]];

        if ( !target ) {

          if ( !handleable && i === ( l - 1 ) ) return RESULT.UNHANDLEABLE; // Can't be handled by any deeper shortcuts

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

          return RESULT.HANDLED;

        }

      }

    }

    if ( firstHandleableIndex > 0 ) { // Simplifying the shortcut, no point in checking unhandleable combinations

      return id.slice ( firstHandleableIndex );

    } else {

      return RESULT.UNHANDLED;

    }

  };

  /* PUBLIC API */

  get = (): ShortcutDescriptor[] => {

    return this.descriptors;

  };

  add = ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] ): void => {

    if ( !Utils.isArray ( descriptors ) ) return this.add ([ descriptors ]);

    descriptors.forEach ( descriptor => {

      const {shortcut, handler} = descriptor;

      if ( shortcut[0] === '-' ) return this.remove ([{ shortcut, handler }]);

      if ( !handler ) return console.error ( `Can't add shortcut "${shortcut}" which has no handler` );

      const id = Shortcut.shortcut2id ( shortcut );

      // if ( !Shortcut.checkValidID ( id ) ) return; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

      this.descriptors.push ( descriptor );

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

  };

  register = ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] ): Disposer => {

    this.add ( descriptors );

    return () => {

      this.remove ( descriptors );

    };

  };

  remove = ( descriptors: ShortcutDescriptor | ShortcutDescriptor[] ): void => {

    if ( !Utils.isArray ( descriptors ) ) return this.remove ([ descriptors ]);

    descriptors.forEach ( descriptor => {

      let {shortcut, handler} = descriptor;

      if ( shortcut[0] === '-' ) shortcut = shortcut.slice ( 1 );

      const id = Shortcut.shortcut2id ( shortcut );

      // if ( !Shortcut.checkValidID ( id ) ) return; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

      this.descriptors = this.descriptors.filter ( d => ( d.shortcut !== shortcut && !Utils.isEqual ( Shortcut.shortcut2id ( d.shortcut ), id ) ) || ( handler && d.handler !== handler ) );

      const lastIndex = id.length - 1;

      id.reduce ( ( parent, id, index ) => {

        const child = parent[id];

        if ( !child ) return {};

        if ( index === lastIndex ) {

          if ( handler ) {

            child.handlers = child.handlers.filter ( h => h !== handler );

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

  };

  reset = (): void => {

    this.descriptors = [];

    this.shortcuts = {
      size: 0,
      handlers: []
    };

    this._updateListener ();

  };

  record = ( handler: RecordHandler ): Disposer => {

    this.recordHandler = handler;

    return () => {

      delete this.recordHandler

    };

  };

  trigger = ( shortcut: ShortcutType | ShortcutID ): boolean => {

    const id = typeof shortcut === 'string' ? Shortcut.shortcut2id ( shortcut ) : shortcut;

    // if ( !Shortcut.checkValidID ( id ) ) return RESULT.UNHANDLEABLE; //TODO: Maybe enable this check, sacrificing some performance for some user friendliness

    return this.handler ( id ) === RESULT.HANDLED;

  };

}

/* EXPORT */

export default Shortcuts;
