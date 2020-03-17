
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

  memoize<T extends Function> ( fn: T ) {

    const cache = {};

    return function memoizedFunction ( id ) {

      const cached = cache[id];

      if ( cached ) return cached;

      return cache[id] = fn.apply ( undefined, arguments );

    } as unknown as T;

  },

};

/* EXPORT */

export default Utils;
