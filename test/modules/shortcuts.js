
const callSpy = require ( 'call-spy' );
const {Shortcut, Shortcuts} = require ( '../../dist' );
const {getShortcutsNr, triggerShortcutEvent} = require ( '../utils' );

describe ( 'Shortcuts', () => {

  describe ( 'add', it => {

    it ( 'logs an error for registering a shortcut without an handler', t => {

      const [fn, res] = callSpy ( () => {} );

      console.error = fn;

      const s = new Shortcuts ();

      const descriptors = [
        { shortcut: 'Ctrl+A' }
      ];

      s.add ( descriptors );

      t.is ( getShortcutsNr ( s ), 0 );
      t.is ( res.arguments[0], 'Can\'t add shortcut "Ctrl+A" which has no handler' );

    });

    it ( 'can add some shortcuts', t => {

      const s = new Shortcuts ();

      t.is ( getShortcutsNr ( s ), 0 );

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+B', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+B', handler: () => {} }
      ];

      s.add ( descriptors );

      const descriptorsMore = [
        { shortcut: 'Ctrl+C', handler: () => {} }
      ];

      s.add ( descriptorsMore[0] );

      t.is ( getShortcutsNr ( s ), 7 );

      t.deepEqual ( s.get (), descriptors.concat ( descriptorsMore ) );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ];

      s.add ( descriptors );

      t.is ( getShortcutsNr ( s ), 0 );

      t.deepEqual ( s.get (), [] );

    });

  });

  describe ( 'remove', it => {

    it ( 'can remove some shortcuts', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      s.add ( descriptorsAdd );

      const descriptorsRemove = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler }
      ];

      s.remove ( descriptorsRemove );

      const descriptorsRemoveMore = [
        { shortcut: 'CmdOrCtrl+K Ctrl+A' }
      ];

      s.remove ( descriptorsRemoveMore[0] );

      t.is ( getShortcutsNr ( s ), 0 );

      t.deepEqual ( s.get (), [] );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      s.add ( descriptorsAdd );

      const descriptorsRemove = [
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ];

      s.remove ( descriptorsRemove );

      t.is ( getShortcutsNr ( s ), 0 );

      t.deepEqual ( s.get (), [] );

    });

    it ( 'supports removing all shortcuts at once', t => {

      const s = new Shortcuts ();

      const descriptorsAdd = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} }
      ];

      s.add ( descriptorsAdd );

      t.is ( getShortcutsNr ( s ), 3 );

      const descriptorsRemove = [
        { shortcut: 'Ctrl+A' },
      ];

      s.remove ( descriptorsRemove );

      t.is ( getShortcutsNr ( s ), 0 );

      t.deepEqual ( s.get (), [] );

    });

  });

  describe ( 'reset', it => {

    it ( 'removes all shortcuts', t => {

      const s = new Shortcuts ();

      const descriptors = [
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ];

      s.add ( descriptors );

      s.reset ();

      t.is ( getShortcutsNr ( s ), 0 );

      t.deepEqual ( s.get (), [] );

    });

  });

  describe ( 'trigger', it => {

    it ( 'calls the first handler for a shortcut that returns true', t => {

      const s = new Shortcuts ();

      const [fn1, res1] = callSpy ( () => {} ),
            [fn2, res2] = callSpy ( () => true ),
            [fn3, res3] = callSpy ( () => {} ),
            [fn4, res4] = callSpy ( () => {} ),
            [fn5, res5] = callSpy ( () => {} ),
            [fn6, res6] = callSpy ( () => {} ),
            [fn7, res7] = callSpy ( () => true );

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

      s.add ( descriptors );

      t.true ( s.trigger ( 'Alt+A' ) );
      t.is ( getCalls (), '0110000' );

      t.false ( s.trigger ( Shortcut.shortcut2id ( 'Ctrl+B' ) ) );
      t.is ( getCalls (), '0111000' );

      t.false ( s.trigger ( 'Ctrl+C' ) );
      t.is ( getCalls (), '0111000' );

      t.false ( s.trigger ( 'CmdOrCtrl+K' ) );
      t.is ( getCalls (), '0111000' );

      t.true ( s.trigger ( 'CmdOrCtrl+K Ctrl+A' ) );
      t.is ( getCalls (), '0111001' );

    });

  });

  describe ( 'handler', it => {

    it ( 'works like trigger', t => {

      const s = new Shortcuts ();

      const [fn1, res1] = callSpy ( () => {} ),
            [fn2, res2] = callSpy ( () => true ),
            [fn3, res3] = callSpy ( () => {} ),
            [fn4, res4] = callSpy ( () => {} ),
            [fn5, res5] = callSpy ( () => {} ),
            [fn6, res6] = callSpy ( () => {} ),
            [fn7, res7] = callSpy ( () => true ),
            [fn8, res8] = callSpy ( () => true );

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

      s.add ( descriptors );

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
