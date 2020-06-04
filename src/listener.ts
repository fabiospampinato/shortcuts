
/* IMPORT */

import {ListenerResult} from './enums';
import {ShouldHandleEventFunction, ShortcutID, ListenerOptions} from './types';
import Shortcut from './shortcut';
import Utils from './utils';

/* LISTENER */

class Listener {

  private options: ListenerOptions;
  private capture: boolean;
  private target: Node;
  private shouldHandleEvent: ShouldHandleEventFunction;

  private currentKeydownShortcutID: ShortcutID = [];
  private currentKeypressShortcutID: ShortcutID = [];
  private resetNextKeydownShortcutID: boolean = false;
  private triggeredNextKeypress: boolean = true;
  private ignoreNextKeypress: boolean = false;
  private listening: boolean = false;

  constructor ( options: ListenerOptions ) {

    this.options = options;
    this.capture = !!options.capture;
    this.target = options.target || document;
    this.shouldHandleEvent = options.shouldHandleEvent || ( event => !event.defaultPrevented );

  }

  on () {

    if ( this.listening ) return;

    this.listening = true;

    this.target.addEventListener ( 'keydown', this.handler, { capture: this.capture } );
    this.target.addEventListener ( 'keypress', this.handler, { capture: this.capture } );

  }

  off () {

    if ( !this.listening ) return;

    this.listening = false;

    this.target.removeEventListener ( 'keydown', this.handler, { capture: this.capture } );
    this.target.removeEventListener ( 'keypress', this.handler, { capture: this.capture } );

  }

  isListening (): boolean {

    return this.listening;

  }

  handler = ( event: KeyboardEvent ) => {

    if ( !this.shouldHandleEvent ( event ) ) return;

    const isKeydown = event.type === 'keydown';

    this.ignoreNextKeypress = false; // Resetting, in case a two keydown events get triggered in a row

    if ( !isKeydown && this.ignoreNextKeypress ) { // Ignoring this keypress, already handled on keydown

      this.triggeredNextKeypress = true;

      return;

    }

    const id = Shortcut.event2id ( event ),
          triggerKey = Shortcut.getTriggerKey ( id );

    if ( !triggerKey ) return; // Only chords with a trigger key are considered

    const shortcutID = isKeydown ? this.currentKeydownShortcutID : this.currentKeypressShortcutID;

    if ( isKeydown && !this.resetNextKeydownShortcutID && !this.triggeredNextKeypress ) { // A chord triggered on keydown didn't get triggered on keypress also, so we copy it over manually

      this.currentKeypressShortcutID.push ( this.currentKeydownShortcutID[this.currentKeydownShortcutID.length - 1] );

    }

    if ( isKeydown && this.resetNextKeydownShortcutID ) { // Resetting keydown shortcut id

      shortcutID.length = 0;

      this.resetNextKeydownShortcutID = false;

    }

    shortcutID.push ( id );

    if ( !isKeydown && Utils.isEqual ( this.currentKeydownShortcutID, shortcutID ) ) { // Avoiding handling keypress for the same detected shortcut in order to maximize performance. Unless the handler for this shortcut has been added between keydown and keypress (weird) this won't be a problem

      if ( this.resetNextKeydownShortcutID ) {

        this.currentKeypressShortcutID.length = 0;

      }

      this.triggeredNextKeypress = true;

      return;

    }

    const result = this.options.handler ( shortcutID, event );

    if ( result === ListenerResult.HANDLED ) { // Resetting all shortcuts

      this.resetNextKeydownShortcutID = true;

      this.currentKeypressShortcutID.length = 0;

    } else if ( result === ListenerResult.UNHANDLEABLE ) { // Resetting only the current shortcut

      if ( isKeydown ) {

        this.resetNextKeydownShortcutID = true;

      } else {

        this.currentKeypressShortcutID.length = 0;

      }

    } else if ( typeof result === 'object' ) { // Changing the current shortcut

      shortcutID.splice ( 0, Infinity, ...result );

    }

    this.ignoreNextKeypress = isKeydown && result === ListenerResult.HANDLED;
    this.triggeredNextKeypress = !isKeydown;

  }

}

/* EXPORT */

export default Listener;
