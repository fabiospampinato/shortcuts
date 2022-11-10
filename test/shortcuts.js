
/* IMPORT */

import callSpy from 'call-spy';
import {describe} from 'fava';
import {Shortcut, Shortcuts} from '../dist/index.js';
import {Emitter, getShortcutsNr, triggerShortcutEvent} from './utils.js';

/* MAIN */

describe ( 'Shortcuts', () => {

  describe ( 'add', it => {

    it ( 'logs an error for registering a shortcut without an handler', t => {

      const [fn, res] = callSpy ( () => {} );

      console.error = fn;

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const descriptors = [
        { shortcut: 'Ctrl+A' }
      ];

      shortcuts.add ( descriptors );

      t.is ( getShortcutsNr ( shortcuts ), 0 );
      t.is ( res.arguments[0], 'Can\'t add shortcut "Ctrl+A" which has no handler' );

    });

    it ( 'can add some shortcuts', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+B', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+B', handler: () => {} }
      ];

      shortcuts.add ( descriptors );

      const descriptorsMore = [
        { shortcut: 'Ctrl+C', handler: () => {} }
      ];

      shortcuts.add ( descriptorsMore[0] );

      t.is ( getShortcutsNr ( shortcuts ), 7 );

      t.deepEqual ( shortcuts.get (), descriptors.concat ( descriptorsMore ) );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const singleHandler = () => {};

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ];

      shortcuts.add ( descriptors );

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      t.deepEqual ( shortcuts.get (), [] );

    });

  });

  describe ( 'remove', it => {

    it ( 'can remove some shortcuts', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const singleHandler = () => {};

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      shortcuts.add ( descriptorsAdd );

      const descriptorsRemove = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler }
      ];

      shortcuts.remove ( descriptorsRemove );

      const descriptorsRemoveMore = [
        { shortcut: 'CmdOrCtrl+K Ctrl+A' }
      ];

      shortcuts.remove ( descriptorsRemoveMore[0] );

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      t.deepEqual ( shortcuts.get (), [] );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const singleHandler = () => {};

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      shortcuts.add ( descriptorsAdd );

      const descriptorsRemove = [
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ];

      shortcuts.remove ( descriptorsRemove );

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      t.deepEqual ( shortcuts.get (), [] );

    });

    it ( 'supports removing all shortcuts at once', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} }
      ];

      shortcuts.add ( descriptorsAdd );

      t.is ( getShortcutsNr ( shortcuts ), 3 );

      const descriptorsRemove = [
        { shortcut: 'Ctrl+A' },
      ];

      shortcuts.remove ( descriptorsRemove );

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      t.deepEqual ( shortcuts.get (), [] );

    });

  });

  describe ( 'reset', it => {

    it ( 'removes all shortcuts', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      shortcuts.add ( descriptors );

      shortcuts.reset ();

      t.is ( getShortcutsNr ( shortcuts ), 0 );

      t.deepEqual ( shortcuts.get (), [] );

    });

  });

  describe ( 'trigger', it => {

    it ( 'calls the first handler for a shortcut that returns true', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const [fn1, res1] = callSpy ( () => {} );
      const [fn2, res2] = callSpy ( () => true );
      const [fn3, res3] = callSpy ( () => {} );
      const [fn4, res4] = callSpy ( () => {} );
      const [fn5, res5] = callSpy ( () => {} );
      const [fn6, res6] = callSpy ( () => {} );
      const [fn7, res7] = callSpy ( () => true );

      const getCalls = () => [res1.calls, res2.calls, res3.calls, res4.calls, res5.calls, res6.calls, res7.calls].join ( '' );

      const descriptors = [
        { shortcut: 'Alt+A', handler: fn1 },
        { shortcut: 'Alt+A', handler: fn2 },
        { shortcut: 'Alt+A', handler: fn3 },
        { shortcut: 'Ctrl+B', handler: fn4 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn5 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn6 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn7 }
      ];

      shortcuts.add ( descriptors );

      t.true ( shortcuts.trigger ( 'Alt+A' ) );
      t.is ( getCalls (), '0110000' );

      t.false ( shortcuts.trigger ( Shortcut.shortcut2id ( 'Ctrl+B' ) ) );
      t.is ( getCalls (), '0111000' );

      t.false ( shortcuts.trigger ( 'Ctrl+C' ) );
      t.is ( getCalls (), '0111000' );

      t.false ( shortcuts.trigger ( 'CmdOrCtrl+K' ) );
      t.is ( getCalls (), '0111000' );

      t.true ( shortcuts.trigger ( 'CmdOrCtrl+K Ctrl+A' ) );
      t.is ( getCalls (), '0111001' );

    });

  });

  describe ( 'handler', it => {

    it ( 'works like trigger', t => {

      const shortcuts = new Shortcuts ({
        target: Emitter
      });

      const [fn1, res1] = callSpy ( () => {} );
      const [fn2, res2] = callSpy ( () => true );
      const [fn3, res3] = callSpy ( () => {} );
      const [fn4, res4] = callSpy ( () => {} );
      const [fn5, res5] = callSpy ( () => {} );
      const [fn6, res6] = callSpy ( () => {} );
      const [fn7, res7] = callSpy ( () => true );
      const [fn8, res8] = callSpy ( () => true );

      const getCalls = () => [res1.calls, res2.calls, res3.calls, res4.calls, res5.calls, res6.calls, res7.calls, res8.calls].join ( '' );

      const descriptors = [
        { shortcut: 'Alt+A', handler: fn1 },
        { shortcut: 'Alt+A', handler: fn2 },
        { shortcut: 'Alt+A', handler: fn3 },
        { shortcut: 'Ctrl+B', handler: fn4 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn5 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn6 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn7 },
        { shortcut: 'CmdOrCtrl+/', handler: fn8 }
      ];

      shortcuts.add ( descriptors );

      triggerShortcutEvent ( 'Alt+A', 'keydown' );
      triggerShortcutEvent ( 'Alt+A', 'keypress' );
      triggerShortcutEvent ( 'Alt+A', 'keyup' );
      t.is ( getCalls (), '01100000' );

      triggerShortcutEvent ( 'Ctrl+B', 'keydown' );
      triggerShortcutEvent ( 'Ctrl+B', 'keypress' );
      triggerShortcutEvent ( 'Ctrl+B', 'keyup' );
      t.is ( getCalls (), '01110000' );

      triggerShortcutEvent ( 'Ctrl+C', 'keydown' );
      triggerShortcutEvent ( 'Ctrl+C', 'keypress' );
      triggerShortcutEvent ( 'Ctrl+C', 'keyup' );
      t.is ( getCalls (), '01110000' );

      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keydown' );
      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keypress' );
      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keyup' );
      t.is ( getCalls (), '01110000' );

      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keydown' );
      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keypress' );
      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keyup' );
      t.is ( getCalls (), '01110010' );

      triggerShortcutEvent ( 'CmdOrCtrl+/', 'keydown' );
      triggerShortcutEvent ( 'CmdOrCtrl+/', 'keypress' );
      triggerShortcutEvent ( 'CmdOrCtrl+/', 'keyup' );
      t.is ( getCalls (), '01110011' );

    });

  });

});
