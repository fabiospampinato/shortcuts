
/* TYPES */

type Chord = string;
type ChordID = number;
type Shortcut = string;
type ShortcutID = ChordID[];

type RecordHandler = ( shortcut: Shortcut ) => any;

type ListenerOptions = {
  handler: ( id: ShortcutID, event: KeyboardEvent ) => import ( './enums' ).ListenerResult | ShortcutID,
  target?: Node
};

type ShortcutsOptions = {
  shortcuts?: ShortcutDescriptor[],
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
