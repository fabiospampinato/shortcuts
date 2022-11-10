
/* MAIN */

const Utils = {

  /* API */

  isArray: ( value: unknown ): value is unknown[] => {

    return Array.isArray ( value );

  },

  isEqual: ( a: number[], b: number[] ): boolean => {

    if ( a.length !== b.length ) return false;

    for ( let i = 0, l = a.length; i < l; i++ ) {

      if ( a[i] !== b[i] ) return false;

    }

    return true;

  },

  isFalsy: ( value: unknown ): boolean => {

    return !value;
  },

  isKeyboardEvent: ( event: Event ): event is KeyboardEvent => {

    return event.type.startsWith ( 'key' );

  },

  isMac: (): boolean => {

    if ( typeof navigator !== 'object' ) return false;

    return /mac|ipod|iphone|ipad/i.test ( navigator.platform );

  },

  isTruthy: ( value: unknown ): boolean => {

    return !!value;
  },

  memoize: <T, R> ( fn: (( arg: T ) => R) ): (( arg: T ) => R) => {

    const cache = new Map<T, R> ();

    return ( arg: T ): R => {

      const cached = cache.get ( arg );

      if ( cached || cache.has ( arg ) ) return cached as R; //TSC

      const result = fn ( arg );

      cache.set ( arg, result );

      return result;

    };

  }

};

/* EXPORT */

export default Utils;
