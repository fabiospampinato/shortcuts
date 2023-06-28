
/* IMPORT */

import ShoSho from 'shosho';
import {FORMAT} from './constants';
import {castArray} from './utils';
import type {Descriptor, Disposer, Handler, Options, Registration} from './types';

/* MAIN */

class Shortcuts {

  /* VARIABLES */

  private registrations: Registration[] = [];
  private shosho: ShoSho;

  /* CONSTRUCTOR */

  constructor ( options: Options ) {

    this.registrations = [];
    this.shosho = new ShoSho ( options );

  }

  /* PUBLIC API */

  get = (): Descriptor[] => {

    return this.registrations.map ( registration => registration.descriptor );

  };

  add = ( descriptor: Descriptor | Descriptor[] ): void => {

    const descriptors = castArray ( descriptor );

    for ( const descriptor of descriptors ) {

      if ( descriptor.shortcut.startsWith ( '-' ) ) {

        this.remove ( descriptor );

      } else if ( descriptor.handler ) {

        const dispose = this.shosho.register ( descriptor.shortcut, descriptor.handler );
        const shortcut = ShoSho.format ( descriptor.shortcut, FORMAT );
        const registration = { descriptor, dispose, shortcut };

        this.registrations.push ( registration );

      } else {

        console.error ( `Cannot register shortcut "${descriptor.shortcut}", which has no handler` );

      }

    }

  };

  register = ( descriptor: Descriptor | Descriptor[] ): Disposer => {

    this.add ( descriptor );

    return (): void => {

      this.remove ( descriptor );

    };

  };

  remove = ( descriptor: Descriptor | Descriptor[] ): void => {

    const descriptors = castArray ( descriptor );

    for ( const descriptor of descriptors ) {

      const handler = descriptor.handler;
      const shortcut = ShoSho.format ( descriptor.shortcut.replace ( /^-/, '' ), FORMAT );

      this.registrations = this.registrations.filter ( registration => {

        if ( ( registration.shortcut !== shortcut ) || ( handler && registration.descriptor.handler !== handler ) ) {

          return true;

        } else {

          registration.dispose ();

          return false;

        }

      });

    }

  };

  reset = (): void => {

    this.registrations = [];
    this.shosho.reset ();

  };

  trigger = ( shortcut: string ): boolean => {

    return this.shosho.trigger ( shortcut );

  };

  start = (): void => {

    this.shosho.start ();

  };

  stop = (): void => {

    this.shosho.stop ();

  };

}

/* EXPORT */

export default Shortcuts;
export type {Descriptor, Disposer, Handler, Options, Registration};
