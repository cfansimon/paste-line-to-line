'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();
    
    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'paste-line-to-line:paste': () => this.paste()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  paste() {
    let editor = atom.workspace.getActiveTextEditor();
    
    if (editor) {
      let clipboard = atom.clipboard;
      let clipboardText = clipboard.read();
      
      if (clipboardText) {
        let pasteLines = clipboardText.split("\n");
        let selections = editor.getSelections();
        for (var i in selections) {
          selections[i].insertText(pasteLines[i]);
        }
        
      } else {
        console.log('clipboard no data');
      }
        
    } else {
      console.log('no active text editor');
    }
  }

};
