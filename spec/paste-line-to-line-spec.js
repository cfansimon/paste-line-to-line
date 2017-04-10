'use babel';

import PasteLineToLine from '../lib/paste-line-to-line';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('PasteLineToLine', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('paste-line-to-line');
    let editor = atom.workspace.buildTextEditor();
    spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
  });

  describe('when the paste-line-to-line:paste event is triggered', () => {
    
    
    it ("paste current clipboard content line-to-line to selection", () => {
      
      clipboard = atom.clipboard;
      clipboard.write("123456\nabcdef");
      
      expect(clipboard.read()).toBe("123456\nabcdef");
      
      let editor = atom.workspace.getActiveTextEditor();
      
      editor.setText("一二三四五六\n\n\nABCDEF");
      editor.setSelectedBufferRanges([[[0, 0], [0, 7]],[[3, 0], [3, 7]]]);

      atom.commands.dispatch(workspaceElement, 'paste-line-to-line:paste');

      waitsForPromise(() => {
        return activationPromise;
      });
      
      editor.selectAll();
      expect(editor.getSelectedText()).toBe("123456\n\n\nabcdef");
        
    });
  });
});
