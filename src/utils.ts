
/* IMPORT */

import ShoSho from 'shosho';
import {FORMAT} from './constants';

/* MAIN */

const castArray = <T> ( value: T | T[] ): T[] => {

  return Array.isArray ( value ) ? value : [value];

};

const memoize = <T, R> ( fn: ( arg: T ) => R ): (( arg: T ) => R) => {

  const cache = new Map ();

  return ( arg: T ): R => {

    const resultCached = cache.get ( arg );

    if ( typeof resultCached !== 'undefined' || cache.has ( arg ) ) return resultCached;

    const result = fn ( arg );

    cache.set ( arg, result );

    return result;

  };

};

const shortcut2id = memoize ( ( shortcut: string ): string => {

  return ShoSho.format ( shortcut, FORMAT );

});

/* EXPORT */

export {castArray, shortcut2id};
