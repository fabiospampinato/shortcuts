
const callSpy = require ( 'call-spy' );
const {Shortcut, Shortcuts} = require ( '../../dist' );
const {getShortcutsNr, triggerShortcutEvent} = require ( '../utils' );

describe ( 'Shortcuts', () => {

  describe ( 'add', it => {

    it ( 'logs an error for registering a shortcut without an handler', t => {

      const [fn, res] = callSpy ( () => {} );

      console.error = fn;

      const s = new Shortcuts ();

      s.add ([
        { shortcut: 'Ctrl+A' }
      ]);

      t.is ( getShortcutsNr ( s ), 0 );
      t.is ( res.arguments[0], 'Can\'t add shortcut "Ctrl+A" which has no handler' );

    });

    it ( 'can add some shortcuts', t => {

      const s = new Shortcuts ();

      t.is ( getShortcutsNr ( s ), 0 );

      s.add ([
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+B', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+B', handler: () => {} }
      ]);

      s.add ({ shortcut: 'Ctrl+C', handler: () => {} });

      t.is ( getShortcutsNr ( s ), 7 );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      s.add ([
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ]);

      t.is ( getShortcutsNr ( s ), 0 );

    });

  });

  describe ( 'remove', it => {

    it ( 'can remove some shortcuts', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      s.add ([
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ]);

      s.remove ([
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'Ctrl+B', handler: singleHandler }
      ]);

      s.remove ({ shortcut: 'CmdOrCtrl+K Ctrl+A' });

      t.is ( getShortcutsNr ( s ), 0 );

    });

    it ( 'supports removing shortcuts with an hyphen', t => {

      const s = new Shortcuts ();

      const singleHandler = () => {};

      s.add ([
        { shortcut: 'Ctrl+A', handler: singleHandler },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ]);

      s.remove ([
        { shortcut: '-Ctrl+A', handler: singleHandler },
        { shortcut: '-CmdOrCtrl+K Ctrl+A' }
      ]);

      t.is ( getShortcutsNr ( s ), 0 );

    });

    it ( 'supports removing all shortcuts at once', t => {

      const s = new Shortcuts ();

      s.add ([
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'Ctrl+A', handler: () => {} }
      ]);

      t.is ( getShortcutsNr ( s ), 3 );

      s.remove ([
        { shortcut: 'Ctrl+A' },
      ]);

      t.is ( getShortcutsNr ( s ), 0 );

    });

  });

  describe ( 'reset', it => {

    it ( 'removes all shortcuts', t => {

      const s = new Shortcuts ();

      s.add ([
        { shortcut: 'Ctrl+A', handler: () => {} },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: () => {} }
      ]);

      s.reset ();

      t.is ( getShortcutsNr ( s ), 0 );

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

      s.add ([
        { shortcut: 'Alt+A', handler: fn1 },
        { shortcut: 'Alt+A', handler: fn2 },
        { shortcut: 'Alt+A', handler: fn3 },
        { shortcut: 'Ctrl+B', handler: fn4 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn5 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn6 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn7 }
      ]);

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
            [fn7, res7] = callSpy ( () => true );

      const getCalls = () => [res1.calls, res2.calls, res3.calls, res4.calls, res5.calls, res6.calls, res7.calls].join ( '' );

      s.add ([
        { shortcut: 'Alt+A', handler: fn1 },
        { shortcut: 'Alt+A', handler: fn2 },
        { shortcut: 'Alt+A', handler: fn3 },
        { shortcut: 'Ctrl+B', handler: fn4 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn5 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn6 },
        { shortcut: 'CmdOrCtrl+K Ctrl+A', handler: fn7 }
      ]);

      triggerShortcutEvent ( 'Alt+A', 'keydown' );
      triggerShortcutEvent ( 'Alt+A', 'keypress' );
      triggerShortcutEvent ( 'Alt+A', 'keyup' );
      t.is ( getCalls (), '0110000' );

      triggerShortcutEvent ( 'Ctrl+B', 'keydown' );
      triggerShortcutEvent ( 'Ctrl+B', 'keypress' );
      triggerShortcutEvent ( 'Ctrl+B', 'keyup' );
      t.is ( getCalls (), '0111000' );

      triggerShortcutEvent ( 'Ctrl+C', 'keydown' );
      triggerShortcutEvent ( 'Ctrl+C', 'keypress' );
      triggerShortcutEvent ( 'Ctrl+C', 'keyup' );
      t.is ( getCalls (), '0111000' );

      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keydown' );
      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keypress' );
      triggerShortcutEvent ( 'CmdOrCtrl+K', 'keyup' );
      t.is ( getCalls (), '0111000' );

      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keydown' );
      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keypress' );
      triggerShortcutEvent ( 'CmdOrCtrl+K Ctrl+A', 'keyup' );
      t.is ( getCalls (), '0111001' );

    });

  });

});
