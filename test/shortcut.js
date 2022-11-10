
/* IMPORT */

import {describe} from 'fava';
import {ID2SHORTCUT, ID2ACCELERATOR} from '../dist/maps.js';
import {Shortcut} from '../dist/index.js';

/* MAIN */

describe ( 'Shortcut', () => {

  describe ( 'getTriggerKey', it => {

    it ( 'gets the trigger key', t => {

      const map = {
        'A': 'A' ,
        'Ctrl+A': 'A',
        'F5': 'F5',
        'F50': '',
        'Foo': '',
        '∂': ''
      };

      Object.entries ( map ).map ( ([ shortcut, triggerKey ]) => {

        t.is ( Shortcut.id2accelerator ([ Shortcut.getTriggerKey ( Shortcut.chord2id ( shortcut ) ) ]), triggerKey );

      });

    });

  });

  describe ( 'isValid', it => {

    it ( 'checks if a shortcut id is valid', t => {

      const map = {
        'A': true ,
        'Ctrl+A': true,
        'F5': true,
        'F50': false,
        'Foo': false
      };

      Object.entries ( map ).map ( ([ shortcut, isValid ]) => {

        t.is ( Shortcut.isValidID ( Shortcut.shortcut2id ( shortcut ) ), isValid, Shortcut.shortcut2id ( shortcut ) );

      });

    });

  });

  describe ( 'shortcut2accelerator', it => {

    it ( 'supports basic single-key shortcuts', t => {

      Object.entries ( ID2SHORTCUT ).forEach ( ([ id, shortcut ]) => {

        t.is ( Shortcut.shortcut2accelerator ( shortcut ), ID2ACCELERATOR[id] );

      });

    });

    it ( 'supports basic multi-key shortcuts', t => {

      Object.entries ( ID2ACCELERATOR ).forEach ( ([ id, accelerator ]) => {

        if ( !Shortcut.getTriggerKey ( id ) ) return;

        const shortcut = `Ctrl+${ID2SHORTCUT[id]}`;

        t.is ( Shortcut.shortcut2accelerator ( shortcut ), `Ctrl+${accelerator}` );

      });

    });

    it ( 'supports basic chord shortcuts', t => {

      Object.entries ( ID2ACCELERATOR ).forEach ( ([ id, accelerator ]) => {

        const shortcutSingle = `Ctrl+K ${ID2SHORTCUT[id]}`;

        t.is ( Shortcut.shortcut2accelerator ( shortcutSingle ), `Ctrl+K ${accelerator}` );

        if ( Shortcut.getTriggerKey ( id ) ) {

          const shortcutMulti = `Ctrl+K Ctrl+${ID2SHORTCUT[id]}`;

          t.is ( Shortcut.shortcut2accelerator ( shortcutMulti ), `Ctrl+K Ctrl+${accelerator}` );

        }

      });

    });

    it ( 'supports advanced shortcuts', t => {

      const tests = [
        ['A', 'A'],
        ['a', 'A'],
        ['Meta', 'Cmd'],
        ['Ctrl+Alt+Shift+Cmd+A', 'Ctrl+Alt+Shift+Cmd+A'],
        ['Alt+Ctrl+Command+Alt+Shift+Cmd+A', 'Ctrl+Alt+Shift+Cmd+A'],
        ['Option+Control+Command', 'Ctrl+Alt+Cmd'],
        ['Ctrl++', 'Ctrl+Plus'],
        ['Ctrl+K Alt+D', 'Ctrl+K Alt+D'],
        ['Ctrl+K Shift+Numpad0', 'Ctrl+K Shift+num0'],
        ['Ctrl+K Ctrl+K', 'Ctrl+K Ctrl+K']
      ];

      tests.forEach ( ([ shortcut, output ]) => {

        t.is ( Shortcut.shortcut2accelerator ( shortcut ), output );

      });

    });

  });

  describe ( 'shortcut2symbols', it => {

    it ( 'converts ids to symbols', t => {

      const tests = [
        ['A', 'A'],
        ['a', 'A'],
        ['Ctrl+Alt+Shift+Cmd+A', '⌃⌥⇧⌘A'],
        ['Alt+Ctrl+Command+Alt+Shift+Cmd+A', '⌃⌥⇧⌘A'],
        ['Ctrl++', '⌃+'],
      ];

      tests.forEach ( ([ shortcut, output ]) => {

        t.is ( Shortcut.shortcut2symbols ( shortcut ), output );

      });

    });

  });

});
