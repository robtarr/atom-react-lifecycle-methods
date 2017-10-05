'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.observeTextEditors(textEditor => {
        this.subscriptions.add(textEditor.onDidChange(this.highlight));
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  seralize() {},

  highlight() {
    lcMethods = [
      'constructor',
      'componentWillMount',
      'render',
      'componentDidMount',
      'componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'render',
      'componentDidUpdate',
      'componentWillUnmount'
    ];

    const editor = atom.workspace.getActiveTextEditor();

    const functions = document.querySelectorAll('.syntax--function');
    const results = [...functions].filter(f => lcMethods.includes(f.innerText));
    results.forEach(method => method.classList.add('lifecycle-highlighter', 'react-lifecycleMethod'));
  }

};
