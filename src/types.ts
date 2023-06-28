
/* IMPORT */

import type {Options} from 'shosho';

/* MAIN */

type Descriptor = {
  handler?: Handler,
  shortcut: string
};

type Disposer = {
  (): void
};

type Handler = {
  ( event?: Event ): boolean | void
};

type Registration = {
  descriptor: Descriptor,
  dispose: Disposer,
  shortcut: string
};

/* EXPORT */

export type {Descriptor, Disposer, Handler, Options, Registration};
