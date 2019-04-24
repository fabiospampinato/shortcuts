
/* UTILS */

const Utils = {

  plusesRe: /\+{2,}/gi,

  whitespaceRe: /\s+/gi,

  isMac: /mac|ipod|iphone|ipad/i.test ( navigator.platform ),

  isEqual ( x: any[], y: any[] ): boolean {

    if ( x.length !== y.length ) return false;

    for ( let i = 0, l = x.length; i < l; i++ ) {

      if ( x[i] !== y[i] ) return false;

    }

    return true;

  },

  memoize<T extends Function> ( fn: T, resolver?: Function ) {

    const cache = {};

    return function memoizedFunction () {

      const key = resolver ? resolver.apply ( undefined, arguments ) : arguments[0];

      if ( key in cache ) return cache[key];

      return cache[key] = fn.apply ( undefined, arguments );

    } as unknown as T;

  },

  memoizedShortcutIDResolver: id => id.toString ()

};

/* EXPORT */

export default Utils;
