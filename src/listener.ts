
/* IMPORT */

import {RESULT} from './constants';
import Shortcut from './shortcut';
import Utils from './utils';
import type {ShouldHandleEventFunction, ShortcutID, ListenerOptions} from './types';

/* MAIN */

class Listener {

  /* VARIABLES */

  private options: ListenerOptions;
  private capture: boolean;
  private target: Node;
  private shouldHandleEvent: ShouldHandleEventFunction;

  private lastKeydownID: number = -1;
  private currentKeydownShortcutID: ShortcutID = [];
  private currentKeypressShortcutID: ShortcutID = [];
  private currentKeyupShortcutID: ShortcutID = [];
  private resetNextKeydownShortcutID: boolean = false;
  private triggeredNextKeypress: boolean = true;
  private ignoreNextKeypress: boolean = false;
  private listening: boolean = false;

  /* CONSTRUCTOR */

  constructor ( options: ListenerOptions ) {

    this.options = options;
    this.capture = !!options.capture;
    this.target = options.target || document;
    this.shouldHandleEvent = options.shouldHandleEvent || ( event => !event.defaultPrevented );

  }

  /* API */

  on = (): void => {

    if ( this.listening ) return;

    this.listening = true;

    this.target.addEventListener ( 'keydown', this.handler, { capture: this.capture } );
    this.target.addEventListener ( 'keypress', this.handler, { capture: this.capture } );
    this.target.addEventListener ( 'keyup', this.handler, { capture: this.capture } );

  };

  off = (): void => {

    if ( !this.listening ) return;

    this.listening = false;

    this.target.removeEventListener ( 'keydown', this.handler, { capture: this.capture } );
    this.target.removeEventListener ( 'keypress', this.handler, { capture: this.capture } );
    this.target.removeEventListener ( 'keyup', this.handler, { capture: this.capture } );

  };

  isListening = (): boolean => {

    return this.listening;

  };

  handler = ( event: Event ): void => {

    if ( !Utils.isKeyboardEvent ( event ) ) return;

    if ( !this.shouldHandleEvent ( event ) ) return;

    const {type} = event;
    const isKeydown = ( type === 'keydown' );
    const isKeypress = ( type === 'keypress' );
    const isKeyup = ( type === 'keyup' );

    if ( isKeydown ) { // Resetting, in case two keydown events get triggered in a row

      this.ignoreNextKeypress = false;

    }

    if ( isKeypress && this.ignoreNextKeypress ) { // Ignoring this keypress, already handled on keydown

      this.triggeredNextKeypress = true;

      return;

    }

    const id = Shortcut.event2id ( event );
    const triggerKey = Shortcut.getTriggerKey ( id );

    if ( isKeydown ) {

      this.lastKeydownID = id;

    }

    if ( isKeyup && ( triggerKey || id !== this.lastKeydownID ) ) { // Keyup only handles no-trigger events, if no other shortcuts with triggers have been triggered before, if no other keys havve been registered on keyPress

      this.currentKeyupShortcutID.length = 0;

      return;

    }

    if ( !isKeyup && !triggerKey ) return; // Only keyup handles non-trigger events

    const shortcutID = isKeydown ? this.currentKeydownShortcutID : ( isKeyup ? this.currentKeyupShortcutID : this.currentKeypressShortcutID );

    if ( isKeydown && !this.resetNextKeydownShortcutID && !this.triggeredNextKeypress ) { // A chord triggered on keydown didn't get triggered on keypress also, so we copy it over manually

      this.currentKeypressShortcutID.push ( this.currentKeydownShortcutID[this.currentKeydownShortcutID.length - 1] );

    }

    if ( isKeydown && this.resetNextKeydownShortcutID ) { // Resetting keydown shortcut id

      shortcutID.length = 0;

      this.resetNextKeydownShortcutID = false;

    }

    shortcutID.push ( id );

    if ( isKeypress && Utils.isEqual ( this.currentKeydownShortcutID, shortcutID ) ) { // Avoiding handling keypress for the same detected shortcut in order to maximize performance. Unless the handler for this shortcut has been added between keydown and keypress (weird) this won't be a problem

      if ( this.resetNextKeydownShortcutID ) {

        this.currentKeypressShortcutID.length = 0;

      }

      this.triggeredNextKeypress = true;

      return;

    }

    const result = this.options.handler ( shortcutID, event );

    if ( result === RESULT.HANDLED ) { // Resetting all shortcuts

      this.resetNextKeydownShortcutID = true;

      this.currentKeypressShortcutID.length = 0;

      this.currentKeyupShortcutID.length = 0;

    } else if ( result === RESULT.UNHANDLEABLE ) { // Resetting only the current shortcut

      if ( isKeydown ) {

        this.resetNextKeydownShortcutID = true;

      } else if ( isKeypress ) {

        this.currentKeypressShortcutID.length = 0;

      } else if ( isKeyup ) {

        this.currentKeyupShortcutID.length = 0;

      }

    } else if ( typeof result === 'object' ) { // Changing the current shortcut

      shortcutID.splice ( 0, Infinity, ...result );

    }

    if ( !isKeyup ) {

      this.ignoreNextKeypress = isKeydown && result === RESULT.HANDLED;
      this.triggeredNextKeypress = isKeypress;

    }

  };

}

/* EXPORT */

export default Listener;
