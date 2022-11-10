
/* MAIN */

type Chord = string;
type ChordID = number;
type Shortcut = string;
type ShortcutID = ChordID[];

type Disposer = () => void;
type RecordHandler = ( shortcut: Shortcut ) => void;
type ShouldHandleEventFunction = ( event: KeyboardEvent ) => boolean;

type ListenerOptions = {
  capture?: boolean,
  target?: Node,
  handler: ( id: ShortcutID, event: KeyboardEvent ) => 0 | 1 | 2 | ShortcutID,
  shouldHandleEvent?: ShouldHandleEventFunction
};

type ShortcutsOptions = {
  capture?: boolean,
  target?: Node,
  shortcuts?: ShortcutDescriptor[],
  shouldHandleEvent?: ShouldHandleEventFunction
};

type ShortcutsTree = {
  [id: number]: ShortcutsTree,
  parent?: ShortcutsTree,
  id?: ChordID,
  size: number,
  handlers: Function[]
};

type ShortcutDescriptor = {
  handler?: ( event: KeyboardEvent ) => boolean | void,
  shortcut: string
};

/* EXPORT */

export type {Chord, ChordID, Shortcut, ShortcutID};
export type {Disposer, RecordHandler, ShouldHandleEventFunction};
export type {ListenerOptions, ShortcutsOptions, ShortcutsTree, ShortcutDescriptor};
