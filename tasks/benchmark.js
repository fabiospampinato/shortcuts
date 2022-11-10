
/* IMPORT */

import benchmark from 'benchloop';
import {Shortcut, Shortcuts} from '../dist/index.js';
import {Emitter} from '../test/utils.js';
import {DESCRIPTOR, DESCRIPTORS} from './fixtures.js';

/* MAIN */

benchmark.defaultOptions = Object.assign ( benchmark.defaultOptions, {
  iterations: 50000,
  log: 'compact',
  beforeEach: ctx => {
    ctx.shortcuts = new Shortcuts ({ target: Emitter });
    ctx.shortcuts.add ( DESCRIPTORS );
  },
  afterEach: ctx => {
    ctx.shortcuts.reset ();
  }
});

benchmark.group ( 'Shortcuts', () => {

  benchmark ({
    name: 'get',
    fn: ctx => {
      ctx.shortcuts.get ();
    }
  });

  benchmark ({
    name: 'add',
    fn: ctx => {
      ctx.shortcuts.add ( DESCRIPTOR );
    }
  });

  benchmark ({
    name: 'remove',
    fn: ctx => {
      ctx.shortcuts.remove ( DESCRIPTORS[0] );
    }
  });

  benchmark ({
    name: 'reset',
    fn: ctx => {
      ctx.shortcuts.reset ();
    }
  });

  benchmark ({
    name: 'trigger',
    fn: ctx => {
      ctx.shortcuts.trigger ( DESCRIPTORS[0] );
    }
  });

});

benchmark.group ( 'Shortcut', () => {

  benchmark ({
    name: 'shortcut2id',
    fn: () => {
      Shortcut.shortcut2id ( 'Ctrl+A' );
      Shortcut.shortcut2id ( 'Ctrl+K Ctrl+M' );
    }
  });

  benchmark ({
    name: 'shortcut2accelerator',
    fn: () => {
      Shortcut.shortcut2accelerator ( 'Ctrl+A' );
      Shortcut.shortcut2accelerator ( 'Ctrl+K Ctrl+M' );
    }
  });

  benchmark ({
    name: 'shortcut2symbols',
    fn: () => {
      Shortcut.shortcut2symbols ( 'Ctrl+A' );
      Shortcut.shortcut2symbols ( 'Ctrl+K Ctrl+M' );
    }
  });

});

benchmark.summary ();
