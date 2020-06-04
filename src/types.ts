
/* TYPES */

type Chord = string;
type ChordID = number;
type Shortcut = string;
type ShortcutID = ChordID[];

type RecordHandler = ( shortcut: Shortcut ) => any;
type ShouldHandleEventFunction = ( event: KeyboardEvent ) => boolean;

type ListenerOptions = {
  handler: ( id: ShortcutID, event: KeyboardEvent ) => import ( './enums' ).ListenerResult | ShortcutID,
  capture?: boolean,
  target?: Node,
  shouldHandleEvent?: ShouldHandleEventFunction
};

type ShortcutsOptions = {
  capture?: boolean,
  shortcuts?: ShortcutDescriptor[],
  shouldHandleEvent?: ShouldHandleEventFunction,
  target?: Node
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

export {Chord, ChordID, Shortcut, ShortcutID, RecordHandler, ShouldHandleEventFunction, ListenerOptions, ShortcutsOptions, ShortcutsTree, ShortcutDescriptor};
