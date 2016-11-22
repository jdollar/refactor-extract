'use babel';

import RefactorExtractView from './refactor-extract-view';
import { CompositeDisposable } from 'atom';

export default {

  refactorExtractView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.refactorExtractView = new RefactorExtractView(state.refactorExtractViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.refactorExtractView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'refactor-extract:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.refactorExtractView.destroy();
  },

  serialize() {
    return {
      refactorExtractViewState: this.refactorExtractView.serialize()
    };
  },

  toggle() {
    console.log('RefactorExtract was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
